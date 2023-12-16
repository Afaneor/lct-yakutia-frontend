import { useEffect, useState } from 'react'

/**
 * Хук для работы с массивами
 * @param initList
 * @param onChanged
 */
export const useListState = (
  initList: any,
  onChanged?: (list: any) => void
) => {
  const [list, setList] = useState(initList)

  const addItemsToList = (items: any[]) => {
    setList((prevState: any) => [...prevState, ...items])
  }

  const removeItemFromList = (item: any) => {
    let tempList = [] as any[]
    setList((prevState: any) => {
      const index = prevState.indexOf(item)
      tempList = [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1, prevState.length),
      ]
      return tempList
    })
    return tempList
  }

  const removeItemFromListById = (id: any) => {
    setList((prevState: any) => prevState.filter((el: any) => el.id !== id))
  }

  const removeItemFromListByIndex = (index: number) => {
    setList((prevState: any) => {
      return [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1, prevState.length),
      ]
    })
  }

  const clearList = () => {
    setList([])
  }

  useEffect(() => {
    onChanged?.(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  return {
    list,
    addItemsToList,
    removeItemFromList,
    clearList,
    removeItemFromListById,
    removeItemFromListByIndex,
  }
}
