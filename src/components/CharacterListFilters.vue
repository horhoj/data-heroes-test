<script setup lang="ts">
import { Status } from '@/api/charactersListResponseItem.types'
import type { LocationQuery } from 'vue-router'
import debounce from 'lodash/debounce'

const STATUS_NOT_CHOSEN_VALUE = ''
const DEBOUNCE_TIMEOUT = 600

const props = defineProps<{
  searchParams: LocationQuery
  setSearchParams: (value: LocationQuery) => void
  name: string
  status: string
  isLoading: boolean
}>()

const handleSearchChange = debounce((e: Event) => {
  const value = (e.target as HTMLInputElement).value
  props.setSearchParams({
    ...props.searchParams,
    name: value,
    page: '1'
  })
}, DEBOUNCE_TIMEOUT)

const handleStatusSelect = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value

  props.setSearchParams({
    ...props.searchParams,
    status: value,
    page: '1'
  })
}

const handleResetFilters = () => {
  props.setSearchParams({})
}
</script>

<template>
  <div class="filters-wrap">
    <div class="filter-field">
      <label class="filter-label">Character name</label>
      <input
        @input="handleSearchChange"
        :value="name"
        class="filter filter-input"
        :readonly="isLoading"
      />
    </div>
    <div class="filter-field">
      <label class="filter-label">Character status</label>
      <select
        class="filter"
        @change="handleStatusSelect"
        :value="status"
        placeholder="...input name"
        :disabled="isLoading"
      >
        <option>{{ STATUS_NOT_CHOSEN_VALUE }}</option>
        <option>{{ Status.Alive.toLowerCase() }}</option>
        <option>{{ Status.Dead.toLowerCase() }}</option>
        <option>{{ Status.Unknown.toLowerCase() }}</option>
      </select>
    </div>
    <div>
      <button class="filter-reset-btn" @click="handleResetFilters" :disabled="isLoading">
        reset
      </button>
    </div>
  </div>
</template>

<style scoped>
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
  transition: opacity 300ms;
}

.filter-input:read-only {
  opacity: 0.5;
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
  transition: opacity 300ms;
}

.filter-reset-btn:disabled {
  opacity: 0.5;
}
</style>
