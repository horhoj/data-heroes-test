import { delay } from '@/helpers/delay'
import type { characterResponseItem } from './characterResponseItem.types'
import type { CharacterListResponse } from './charactersListResponseItem.types'
import { API_DEFAULT_REQUEST_HEADERS, BASE_URL } from './config'
import axios from 'axios'

const axiosInstance = axios.create({ baseURL: BASE_URL, headers: API_DEFAULT_REQUEST_HEADERS })

const fetchCharacterList = async (page: number, name: string, status: string) => {
  await delay(500)

  const res = await axiosInstance.request<CharacterListResponse>({
    url: '/character',
    params: { page, name, status }
  })

  return res.data
}

const fetchCharacter = async (id: number) => {
  const res = await axiosInstance.request<characterResponseItem>({
    url: `character/${id}`
  })

  return res.data
}

export const charactersApi = { fetchCharacterList, fetchCharacter } as const
