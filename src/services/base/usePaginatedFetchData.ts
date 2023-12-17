import BaseServices from 'src/services/base/BaseServices'
import { useChoices } from 'src/services/base/hooks'
import { BaseModel } from 'src/models'
import { useFilter, useTablePageParams } from 'src/hooks'
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useMemo } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import { Sorter } from 'src/components'

const fetchData = async ({ pageParam: offset = 0, filters, url }: any) => {
  return BaseServices.fetch(url, {
    ...filters,
    limit: filters.limit || 10,
    offset: filters.offset || 0,
  })
    .then((response: typeof AxiosResponse) => {
      if (response?.response?.status === 401) {
        return response.response
      }
      const nextPage = response.data?.next ? offset + filters.limit : undefined
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
        filters: { limit: 10, offset: 0, ...defFilters, ...filters },
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
  const { page, pageSize } = useTablePageParams(filters.limit, filters.offset)
  const handlePaginationChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: Sorter | Record<string, any>
  ) => {
    const cOffset =
      pagination.pageSize !== pageSize
        ? 10
        : pagination.current
        ? (pagination.current - 1) * (pagination?.pageSize || 1)
        : 10

    const drfPagination = {
      offset: pagination.pageSize !== pageSize ? 0 : cOffset,
      limit: pagination?.pageSize || 10,
    }
    setFilters({
      ...defFilters,
      ...drfPagination,
    })
    // onChange?.(drfPagination, filters, sorter)
    return { drfPagination, filters, sorter }
  }

  return {
    rowData,
    ...infinityData,
    setFilters,
    dataCount,
    page,
    pageSize,
    handlePaginationChange,
  }
}
