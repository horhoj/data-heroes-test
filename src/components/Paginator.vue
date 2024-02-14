<script setup lang="ts">
import classNames from 'classnames'

const props = defineProps<{
  page: number
  lastPage: number
  isLoading: boolean
}>()

const emit = defineEmits<{ (e: 'on-paginate', page: number): void }>()

const handleFirst = () => {
  if (props.page !== 1) {
    emit('on-paginate', 1)
  }
}

const handleLast = () => {
  if (props.page !== props.lastPage) {
    emit('on-paginate', props.lastPage)
  }
}

const handlePrev = () => {
  const prevPage = props.page - 1
  if (prevPage >= 1) {
    emit('on-paginate', prevPage)
  }
}

const handleNext = () => {
  const nextPage = props.page + 1
  if (nextPage <= props.lastPage) {
    emit('on-paginate', nextPage)
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
