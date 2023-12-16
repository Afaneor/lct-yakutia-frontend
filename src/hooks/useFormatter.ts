import { SomeObject } from 'src/components/types'
import { ProfilesModelProps } from 'src/models'

export const useCemalToSnakeCase = () => {
  return (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

export const useObjKeysToSnakeCase = () => {
  const toSnake = useCemalToSnakeCase()

  return (obj: SomeObject) => {
    const res = {} as any
    if (!obj) return res
    for (const [key, val] of Object.entries(obj)) {
      res[toSnake(key)] = val
    }
    return res
  }
}

/**
 * Отображение полного имени
 * @param user
 * @return {string}
 */
export const fullName = (user?: ProfilesModelProps['user']) => {
  if (!user) return ''
  const result = []
  if (user.lastName) result.push(user.lastName)
  if (user.firstName) result.push(user.firstName)
  if (user.secondName) result.push(user.secondName)
  return result.join(' ')
}
