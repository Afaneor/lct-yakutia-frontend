/**
 * Получаем человекопонятное название чойса
 */
import { QueryKey, useQueryClient } from '@tanstack/react-query'

export interface Choice {
  value: string
  displayName: string
}

export const useGetDisplayNameFromChoices = () => {
  const queryClient = useQueryClient()
  return (modelName: string, type: string, value: string | number) => {
    if (!modelName || !type) {
      throw new Error(
        'useGetDisplayNameFromChoices: modelName, type is required'
      )
    }
    const choices: Record<string, any> =
      queryClient.getQueryData([`${modelName}Choices`] as QueryKey) || {}
    if (choices && choices[type]) {
      return choices[type]?.choices?.find(
        (item: Choice) => item.value === value
      )?.displayName
    }
    return null
  }
}

export const useGetChoicesListFromChoices = () => {
  const queryClient = useQueryClient()
  return (modelName: string, type: string) => {
    const choices: any =
      queryClient.getQueryData([`${modelName}Choices`] as QueryKey) || {}
    if (choices && choices[type]) {
      return choices[type]?.choices
    }
    return []
  }
}
