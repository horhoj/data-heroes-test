<script setup lang="ts">
import type { RequestError } from '@/hooks/useRequest'
import { computed } from 'vue'

const props = defineProps<{ error: RequestError }>()

const error = computed(() => {
  if (props.error.code === 404) {
    return 'NOT FOUND'
  }

  return props.error.message
})
</script>

<template>
  <div class="error">{{ error }}</div>
</template>

<style scoped>
.error {
  padding: 15px;
  color: #fff;
}
</style>
