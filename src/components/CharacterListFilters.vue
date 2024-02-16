<script setup lang="ts">
import { Status } from '@/api/charactersListResponseItem.types'
import { computed, ref, watch } from 'vue'

const STATUS_NOT_CHOSEN_VALUE = ''

const props = defineProps<{
  name: string
  status: string
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'on-filter', name: string, status: string): void
  (e: 'on-filter-reset'): void
}>()

const fName = ref('')
const fStatus = ref(STATUS_NOT_CHOSEN_VALUE)

watch(props, () => {
  fName.value = props.name
  fStatus.value = props.status
})

const handleResetFilters = () => {
  emit('on-filter-reset')
}

const handleSubmitFilters = () => {
  emit('on-filter', fName.value, fStatus.value)
}

const isSubmitDisabled = computed(
  () => props.isLoading || (fName.value === props.name && fStatus.value === props.status)
)
</script>

<template>
  <div class="filters-wrap">
    <div class="filter-field">
      <label class="filter-label">Character name</label>
      <input v-model.trim="fName" class="filter filter-input" :readonly="isLoading" />
    </div>
    <div class="filter-field">
      <label class="filter-label">Character status</label>
      <select class="filter" :disabled="isLoading" v-model="fStatus">
        <option>{{ STATUS_NOT_CHOSEN_VALUE }}</option>
        <option>{{ Status.Alive.toLowerCase() }}</option>
        <option>{{ Status.Dead.toLowerCase() }}</option>
        <option>{{ Status.Unknown.toLowerCase() }}</option>
      </select>
    </div>
    <div class="filter-btns-wrap">
      <button class="filter-btn" @click="handleSubmitFilters" :disabled="isSubmitDisabled">
        submit
      </button>
      <button class="filter-btn" @click="handleResetFilters" :disabled="isLoading">reset</button>
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

.filter-btn {
  min-height: 40px;
  min-width: 150px;
  background-color: darkslateblue;
  border: none;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 300ms;
}

.filter-btn:disabled {
  opacity: 0.5;
}

.filter-btns-wrap {
  display: flex;
  gap: 15px;
}
</style>
