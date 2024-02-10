<script setup lang="ts">
import { getNumberQueryParam, getStringQueryParam } from '@/helpers/queryParams'
import { useRequest } from '@/hooks/useRequest'
import { useSearchParams } from '@/hooks/useSearchParams'
import { computed, watch } from 'vue'
import { charactersApi } from '@/api/characters'
import Paginator from '@/components/Paginator.vue'
import CharacterListCard from '@/components/CharacterListCard.vue'
import debounce from 'lodash/debounce'
import { Status } from '@/api/charactersListResponseItem.types'

const DEBOUNCE_TIMEOUT = 500
const STATUS_NOT_CHOSEN_VALUE = ''

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

const handleSearchChange = debounce((e: Event) => {
  const value = (e.target as HTMLInputElement).value
  setSearchParams({
    ...searchParams.value,
    name: value,
    page: '1'
  })
}, DEBOUNCE_TIMEOUT)

const handleStatusSelect = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value

  setSearchParams({
    ...searchParams.value,
    status: value,
    page: '1'
  })
}

const handleResetFilters = () => {
  setSearchParams({})
}
</script>

<template>
  <div class="global-container">
    <div class="filters-wrap">
      <div class="filter-field">
        <label class="filter-label">Character name</label>
        <input @input="handleSearchChange" :value="name" class="filter" />
      </div>
      <div class="filter-field">
        <label class="filter-label">Character status</label>
        <select
          class="filter"
          @change="handleStatusSelect"
          :value="status"
          placeholder="...input name"
        >
          <option>{{ STATUS_NOT_CHOSEN_VALUE }}</option>
          <option>{{ Status.Alive.toLowerCase() }}</option>
          <option>{{ Status.Dead.toLowerCase() }}</option>
          <option>{{ Status.Unknown.toLowerCase() }}</option>
        </select>
      </div>
      <div>
        <button class="filter-reset-btn" @click="handleResetFilters">reset</button>
      </div>
    </div>
    <template v-if="fetchCharactersRequest.response.value">
      <Paginator
        :page="page"
        :last-page="fetchCharactersRequest.response.value.info.pages"
        :on-paginate="handlePaginate"
      />
      <ul class="character-list">
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
        :on-paginate="handlePaginate"
      />
    </template>
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
}

.filters-wrap {
  display: flex;
  padding: 15px;
  gap: 15px;
  align-items: flex-end;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
.filter-label {
  color: #fff;
}

.filter {
  background-color: #3c3e44;
  border: none;
  padding: 0 15px;
  color: #fff;
  width: 100%;
  min-height: 40px;
  font-size: 18px;
  border-radius: 10px;
}

.filter option {
  background-color: #222;
  font-size: 18px;
}

.filter-reset-btn {
  min-height: 40px;
  min-width: 150px;
  background-color: darkslateblue;
  border: none;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
</style>
@/api/charactersListResponseItem.types