import BaseServices from 'src/services/base/BaseServices'
import { useChoices } from 'src/services/base/hooks'
import { BaseModel } from 'src/models'
import { useFilter } from 'src/hooks'
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useMemo } from 'react'

const fetchData = async ({ pageParam: offset = 0, filters, url }: any) => {
  return BaseServices.fetch(url, {
    // offset,
    ...filters,
    limit: filters.limit || 10,
    offset: filters.offset || 0,
  })
    .then((response: typeof AxiosResponse) => {
      if (response?.response?.status === 401) {
        return response.response
      }
      const nextPage = response.data?.next ? offset + filters.limit : undefined
      // stagesCounter = response.data?.stagesCounter
      return {
        data: response.data.results,
        nextPage,
        status: response.status,
        count: response.data.count,
      }
    })
    .catch((error: any) => {
      console.error(error.response)
      return error.response
    })
}

export interface UsePaginatedFetchDataProps {
  model: typeof BaseModel
  defFilters: object
  options: object
  qKeyPrefix?: string
  dependOn?: string | number
  apiUrl?: string
}
const getNextPageParam = (
  lastPage: Record<'nextPage', any>
): number | undefined => {
  return lastPage?.nextPage
}
export const usePaginatedFetchData = <ModelType>({
  model,
  defFilters,
  options,
  qKeyPrefix,
  dependOn,
  apiUrl,
}: UsePaginatedFetchDataProps) => {
  const url = apiUrl || model.url()
  // запрашиваем опции с бека, для прогрузки полей с чойсами
  const qKey = qKeyPrefix || model.modelName
  useChoices(qKey, url)
  const [filters, setFilters] = useFilter({})

  const queryKey = qKeyPrefix
    ? `${qKeyPrefix}Infinity`
    : `${model.modelName}Infinity`

  const infinityData = useInfiniteQuery(
    [queryKey, filters, defFilters, dependOn] as QueryKey,
    ({ pageParam }) =>
      fetchData({
        pageParam,
        filters: { limit: 10, ...defFilters, ...filters },
        url,
      }),
    {
      getNextPageParam,
      refetchOnWindowFocus: false,
      ...options,
    }
  )
  const dataCount = useMemo(
    // @ts-ignore
    () => infinityData?.data?.pages?.[0]?.count,
    [infinityData?.data?.pages]
  )

  const rowData: ModelType[] = []
  infinityData.data?.pages?.forEach((page: any) => {
    if (page?.status === 200 && page?.data) {
      rowData.push(...page.data)
    } else if (page?.status === 401) {
      location.reload()
    }
  })
  return {
    rowData,
    ...infinityData,
    setFilters,
    dataCount,
  }
}
