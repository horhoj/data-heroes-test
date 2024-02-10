import { ref } from 'vue'
import type { Ref } from 'vue'

export const useRequest = <T>(request: () => Promise<T>, isClearDataOnNewRequest = false) => {
  const response = ref(null) as Ref<T | null>
  const isLoading = ref<boolean>(false)
  const requestError = ref<unknown | null>(null)

  const load = async (): Promise<void> => {
    try {
      isLoading.value = true
      requestError.value = null
      if (isClearDataOnNewRequest) {
        response.value = null
      }

      const currentResponse = await request()

      if (currentResponse !== undefined && currentResponse !== null) {
        response.value = currentResponse
      }
    } catch (e) {
      if (e instanceof Error) {
        requestError.value = e.message
      } else {
        requestError.value = 'unknown error'
      }
      response.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    response,
    isLoading,
    requestError,
    load
  }
}
