<script setup lang="ts">
const props = defineProps<{ page: number; lastPage: number; onPaginate: (page: number) => void }>()

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
  <div class="paginator">
    <button class="button" @click="handleFirst">{{ '<<' }}</button>
    <button class="button" @click="handlePrev">{{ '<' }}</button>
    <span class="page">{{ props.page }} - {{ props.lastPage }}</span>
    <button class="button" @click="handleNext">{{ '>' }}</button>
    <button class="button" @click="handleLast">{{ '>>' }}</button>
  </div>
</template>

<style scoped>
.paginator {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  align-items: center;
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
</style>
