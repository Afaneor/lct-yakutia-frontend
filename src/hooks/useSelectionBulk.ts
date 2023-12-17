import React, { useState } from 'react'
import { RowSelectMethod } from 'antd/es/table/interface'

export interface SelectionsProps {
  selectedRowKeys: React.Key[]
  selectedRows: any[]
  allKeys?: React.Key[]
  rowSelectedType: Record<'type', RowSelectMethod>
}

export const selectionDefault = {
  selectedRowKeys: [],
  selectedRows: [],
  rowSelectedType: { type: 'none' },
} as SelectionsProps
export const useSelectionBulk = () => {
  const [selections, setSelections] = useState(selectionDefault)

  const handleSetSelections = (val: any) => {
    const allKeys = { ...val, allKeys: val?.allKeys || false }
    setSelections((prevState: any) => ({ ...prevState, ...allKeys }))
  }
  return { selections, handleSetSelections }
}
