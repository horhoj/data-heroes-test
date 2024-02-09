import type { CharacterListResponse } from './characters.types'
import { API_DEFAULT_REQUEST_HEADERS, BASE_URL } from './config'
import axios from 'axios'

const axiosInstance = axios.create({ baseURL: BASE_URL, headers: API_DEFAULT_REQUEST_HEADERS })

const fetchCharacterList = async (page: number) => {
  const res = await axiosInstance.request<CharacterListResponse>({
    url: '/character',
    params: { page }
  })

  return res.data
}

export const charactersApi = { fetchCharacterList } as const