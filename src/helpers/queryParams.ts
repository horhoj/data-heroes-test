import type { LocationQuery } from 'vue-router'

export const getNumberQueryParam = (
  searchParams: LocationQuery,
  paramName: string,
  defaultValue: number
) => {
  const param = searchParams[paramName] ?? ''
  if (Array.isArray(param)) {
    return defaultValue
  }

  const num = Number.parseInt(param)
  if (Number.isFinite(num)) {
    return num
  }

  return defaultValue
}
