import { onMounted, ref } from 'vue'
import { useRoute, type LocationQuery, useRouter } from 'vue-router'

export const useSearchParams = () => {
  const searchParams = ref<LocationQuery>({})

  const route = useRoute()
  const router = useRouter()

  onMounted(() => (searchParams.value = route.query))

  const setSearchParams = (value: LocationQuery) => {
    searchParams.value = value
    router.replace({ query: searchParams.value })
  }

  return { searchParams, setSearchParams }
}
