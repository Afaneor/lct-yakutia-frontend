export const getFromLocalStorage = (key: string) => {
  const str = localStorage.getItem(key)
  return str ? JSON.parse(str) : undefined
}

/**
 * Получаем данные из localStorage
 * и преобразуем их
 * @param key - ключ в localStorage
 */
export const useLocalStorage = (key: string) => {
  return getFromLocalStorage(key)
}
