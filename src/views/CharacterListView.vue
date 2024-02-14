<script setup lang="ts">
import { getNumberQueryParam, getStringQueryParam } from '@/helpers/queryParams'
import { useRequest } from '@/hooks/useRequest'
import { useSearchParams } from '@/hooks/useSearchParams'
import { computed, watch } from 'vue'
import { charactersApi } from '@/api/characters'
import Paginator from '@/components/Paginator.vue'
import CharacterListCard from '@/components/CharacterListCard.vue'
import CharacterListFilters from '@/components/CharacterListFilters.vue'

import Spinner from '@/components/Spinner.vue'
import RequestError from '@/components/RequestError.vue'
import classNames from 'classnames'

const { searchParams, setSearchParams } = useSearchParams()

const page = computed(() => getNumberQueryParam(searchParams.value, 'page', 1))
const name = computed(() => getStringQueryParam(searchParams.value, 'name', ''))
const status = computed(() => getStringQueryParam(searchParams.value, 'status', ''))

const fetchCharactersRequest = useRequest(() =>
  charactersApi.fetchCharacterList(page.value, name.value, status.value)
)

watch(searchParams, () => {
  fetchCharactersRequest.load()
})

const handlePaginate = (page: number) => {
  setSearchParams({
    ...searchParams.value,
    page: page.toString()
  })
}

const handleFilter = (name: string, status: string) => {
  setSearchParams({ ...searchParams.value, name, status, page: '1' })
}
const handleFilterReset = () => {
  setSearchParams({})
}
</script>

<template>
  <Spinner :is-show="fetchCharactersRequest.isLoading.value" />
  <div class="global-container">
    <CharacterListFilters
      :is-loading="fetchCharactersRequest.isLoading.value"
      :name="name"
      :status="status"
      @on-filter="handleFilter"
      @on-filter-reset="handleFilterReset"
    />
    <template v-if="fetchCharactersRequest.response.value">
      <Paginator
        :page="page"
        :last-page="fetchCharactersRequest.response.value.info.pages"
        :is-loading="fetchCharactersRequest.isLoading.value"
        @on-paginate="handlePaginate"
      />
      <ul
        :class="
          classNames(
            'character-list',
            fetchCharactersRequest.isLoading.value && 'character-list-is-loading'
          )
        "
      >
        <CharacterListCard
          v-for="character in fetchCharactersRequest.response.value.results"
          :character="character"
          :key="character.id"
          :link="{
            name: 'character',
            query: { ...searchParams, id: character.id.toString() }
          }"
        />
      </ul>
      <Paginator
        :page="page"
        :last-page="fetchCharactersRequest.response.value.info.pages"
        :is-loading="fetchCharactersRequest.isLoading.value"
        @on-paginate="handlePaginate"
      />
    </template>
    <RequestError
      v-if="fetchCharactersRequest.requestError.value"
      :error="fetchCharactersRequest.requestError.value"
    />
  </div>
</template>

<style scoped>
.character-list {
  list-style: none;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  transition: opacity 300ms;
}

.character-list-is-loading {
  opacity: 0.5;
}
</style>
