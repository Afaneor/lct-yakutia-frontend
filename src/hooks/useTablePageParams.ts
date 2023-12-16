import { useMemo } from 'react'

/**
  Возвращает объект с параметрами пагинации для таблицы
 */
export const useTablePageParams = (limit: number, offset: number) => {
  return useMemo(() => {
    return {
      page: offset / limit + 1 || 1,
      pageSize: limit || 10,
    }
  }, [offset, limit])
}
