import { FilterConfirmProps } from 'antd/lib/table/interface'
import { BaseModel } from 'src/models'

export interface SomeObject {
  [key: string]: any
}

export interface FilterDropdownProps {
  setSelectedKeys: (val: string[]) => void
  selectedKeys: string[]
  confirm: (param?: FilterConfirmProps) => void
  clearFilters: () => void
  close: () => void
}

export interface DetailEntityOptions {
  isFullHeight?: boolean
  model?: typeof BaseModel
  externalRefetchAll?: () => void
}

export enum TabItemsKeys {
  DESCRIPTION = 'description',
  PORTS = 'ports',
  COMMENTS = 'comments',
  TIMELINE = 'timeline',
}
