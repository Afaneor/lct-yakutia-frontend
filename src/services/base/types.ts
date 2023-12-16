import { AxiosResponse } from 'axios'

export interface ResponseData<T extends DefaultItem = DefaultItem> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
export interface ErrorResponse {
  response: AxiosResponse
  message?: string
}
export interface DefaultItem {
  id: number
}

export interface AxiosResponse<T = ResponseData> {
  config: Record<string, any>
  data: T
  headers: Record<string, unknown>
  request: XMLHttpRequest
  status: number
  statusText: string
}

export interface ReactQueryMutate {
  mutate: CallableFunction
  isLoading: boolean
}

export interface ReactQueryInfinityFetch {
  rowData: Record<string, any>[]
  data: Record<string, any>[]
  refetch: CallableFunction
  fetchNextPage: CallableFunction
  isLoading: boolean
  isFetching: boolean
  [key: string]: unknown
}

export interface ReactQueryFetch {
  data: typeof AxiosResponse
  isLoading: boolean
  refetch: CallableFunction
  isFetching?: boolean
}

export interface PermissionRulesProps {
  add: boolean
  view: boolean
  delete: boolean
  change: boolean
  list: boolean
}
