import get from 'lodash/get'
import { SomeObject } from 'src/components/types'

export const getAdvancedColumns = (
  columns: Record<string, any>,
  defaultFilteredValues?: Record<string, any>
) => {
  return columns?.map((col: any) => {
    return {
      render: (val: SomeObject, row: SomeObject) => {
        return get(row, col.dataIndex, '-')
      },
      ellipsis: true,
      filteredValue: defaultFilteredValues?.getValue(col?.key),
      sortOrder: defaultFilteredValues?.getOrdering(col?.key),
      ...col,
    }
  })
}
