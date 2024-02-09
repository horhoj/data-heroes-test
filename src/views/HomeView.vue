<script setup lang="ts">
import { getNumberQueryParam } from '@/helpers/queryParams'
import { useRequest } from '@/hooks/useRequest'
import { useSearchParams } from '@/hooks/useSearchParams'
import { computed, watch } from 'vue'
import { charactersApi } from '@/api/characters'
import Paginator from '@/components/Paginator.vue'
import CharacterListCard from '@/components/CharacterListCard.vue'

const { searchParams, setSearchParams } = useSearchParams()

const page = computed(() => getNumberQueryParam(searchParams.value, 'page', 1))

const fetchCharactersRequest = useRequest(() => charactersApi.fetchCharacterList(page.value))

watch(searchParams, () => {
  fetchCharactersRequest.load()
})

const handlePaginate = (page: number) => {
  setSearchParams({
    ...searchParams.value,
    page: page.toString()
  })
}
</script>

<template>
  <div class="global-container">
    <div v-if="fetchCharactersRequest.response.value">
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
        />
      </ul>
      <Paginator
        :page="page"
        :last-page="fetchCharactersRequest.response.value.info.pages"
        :on-paginate="handlePaginate"
      />
    </div>

    <!-- <pre>{{ JSON.stringify(fetchCharactersRequest.response.value, null, 2) }}</pre> -->
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
</style>
