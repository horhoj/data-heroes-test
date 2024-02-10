<script setup lang="ts">
import { charactersApi } from '@/api/characters'
import { getNumberQueryParam } from '@/helpers/queryParams'
import { useRequest } from '@/hooks/useRequest'
import { useSearchParams } from '@/hooks/useSearchParams'
import { computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import RequestError from '@/components/RequestError.vue'
import Spinner from '@/components/Spinner.vue'

const { searchParams } = useSearchParams()

const id = computed(() => getNumberQueryParam(searchParams.value, 'id', -1))

const characterListSearchParams = computed(() => {
  const currentSearchParams = { ...searchParams.value }
  delete currentSearchParams['id']
  return currentSearchParams
})

const fetchCharacterRequest = useRequest(() => charactersApi.fetchCharacter(id.value))

watch(searchParams, () => {
  fetchCharacterRequest.load()
})
</script>

<template>
  <Spinner :is-show="fetchCharacterRequest.isLoading.value" />
  <div class="global-container">
    <div class="nav-wrap">
      <RouterLink :to="{ name: 'characters', query: characterListSearchParams }" class="back-link"
        >back</RouterLink
      >
    </div>
    <RequestError
      v-if="fetchCharacterRequest.requestError.value"
      :error="fetchCharacterRequest.requestError.value"
    />
    <div v-if="fetchCharacterRequest.response.value" class="data-wrap">
      <img :src="fetchCharacterRequest.response.value.image" alt="character img" class="img" />
      <div class="data-item">
        <div class="data-item-param-name">name:</div>
        <div class="data-item-param-value">{{ fetchCharacterRequest.response.value.name }}</div>
      </div>
      <div class="data-item">
        <div class="data-item-param-name">gender:</div>
        <div class="data-item-param-value">{{ fetchCharacterRequest.response.value.gender }}</div>
      </div>
      <div class="data-item">
        <div class="data-item-param-name">status:</div>
        <div class="data-item-param-value">{{ fetchCharacterRequest.response.value.status }}</div>
      </div>

      <div class="data-item">
        <div class="data-item-param-name">first location:</div>
        <div class="data-item-param-value">
          {{ fetchCharacterRequest.response.value.location.name }}
        </div>
      </div>
      <div class="data-item">
        <div class="data-item-param-name">species:</div>
        <div class="data-item-param-value">
          {{ fetchCharacterRequest.response.value.species }}
        </div>
      </div>
      <div class="data-item">
        <div class="data-item-param-name">created:</div>
        <div class="data-item-param-value">
          {{ new Date(fetchCharacterRequest.response.value.created).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pre {
  color: #fff;
}

.nav-wrap {
  display: flex;
  padding: 15px;
}

.back-link {
  min-height: 40px;
  min-width: 150px;
  background-color: darkslateblue;
  border: none;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.img {
  width: 300px !important;
  height: 300px !important;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin: auto;
}

.data-wrap {
  display: flex;
  flex-direction: column;

  width: fit-content;
  margin: auto;
  gap: 20px;
  padding: 15px;
}

.data-item {
  color: #fff;
  display: flex;
  gap: 10px;
}

.data-item-param-name {
  display: flex;
  font-weight: 700;
  color: rgb(150, 150, 150);
}
.data-item-param-value {
  display: flex;
  width: fit-content;
}
</style>
