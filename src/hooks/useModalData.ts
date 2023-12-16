import { useToggle } from 'src/hooks/useToggle'
import { useCallback, useState } from 'react'
import { Nullable } from 'src/types'

type TModalDataHook<T, V = unknown> = {
  defaultState?: boolean
  defaultData?: Nullable<T>
  defaultExtra?: Nullable<V>
}

export type TModalDataReturn<T, V = unknown> = {
  isOpen: boolean
  toggleOpen: () => void
  data: Nullable<T>
  setData: (data: T) => void
  clearData: () => void
  extra: Nullable<V>
  setExtra: (extra: V) => void
  clearExtra: () => void
  clearAll: () => void
}

export const useModalData = <T, V = unknown>(
  props?: TModalDataHook<T, V>
): TModalDataReturn<T, V> => {
  const [state, toggleState] = useToggle(props?.defaultState || false)
  const [data, setData] = useState<Nullable<T>>(props?.defaultData || null)
  const [extra, setExtra] = useState<Nullable<V>>(props?.defaultExtra || null)

  const clearData = useCallback(() => setData(null), [])
  const clearExtra = useCallback(() => setExtra(null), [])
  const clearAll = useCallback(() => {
    clearData()
    clearExtra()
  }, [clearData, clearExtra])

  return {
    isOpen: state,
    toggleOpen: toggleState,
    data,
    setData,
    clearData,
    extra,
    setExtra,
    clearExtra,
    clearAll,
  }
}
