<script setup lang="ts">
import classNames from 'classnames'

const props = defineProps<{
  page: number
  lastPage: number
  onPaginate: (page: number) => void
  isLoading: boolean
}>()

const handleFirst = () => {
  if (props.page !== 1) {
    props.onPaginate(1)
  }
}

const handleLast = () => {
  if (props.page !== props.lastPage) {
    props.onPaginate(props.lastPage)
  }
}

const handlePrev = () => {
  const prevPage = props.page - 1
  if (prevPage >= 1) {
    props.onPaginate(prevPage)
  }
}

const handleNext = () => {
  const nextPage = props.page + 1
  if (nextPage <= props.lastPage) {
    props.onPaginate(nextPage)
  }
}
</script>

<template>
  <div :class="classNames('paginator', props.isLoading && 'is-loading')">
    <button class="button" @click="handleFirst" :disabled="props.isLoading">{{ '<<' }}</button>
    <button class="button" @click="handlePrev" :disabled="props.isLoading">{{ '<' }}</button>
    <span class="page">{{ props.page }} - {{ props.lastPage }}</span>
    <button class="button" @click="handleNext" :disabled="props.isLoading">{{ '>' }}</button>
    <button class="button" @click="handleLast" :disabled="props.isLoading">{{ '>>' }}</button>
  </div>
</template>

<style scoped>
.paginator {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  align-items: center;
  transition: all 300ms;
}

.button {
  padding: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  background-color: darkslateblue;
  color: #fff;
  font-size: 16px;
}

.page {
  padding: 10px;
  height: 40px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: darkslateblue;
  color: #fff;
}

.is-loading {
  opacity: 0.5;
}
</style>
