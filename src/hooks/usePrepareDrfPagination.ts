import type { TablePaginationConfig } from 'antd/es/table'

/**
 * Хук для подготовки пагинации для запросов к DRF
 */
export const usePrepareDrfPagination = () => {
  return (pagination: TablePaginationConfig, pageSize: any) => {
    const paginationPageSize = pagination?.pageSize || 10
    const cOffset =
      pagination.pageSize !== pageSize
        ? 0
        : pagination.current
        ? (pagination.current - 1) * paginationPageSize
        : 0

    return {
      offset: cOffset,
      limit: paginationPageSize,
    }
  }
}
