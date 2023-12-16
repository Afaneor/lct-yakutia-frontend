import { useCallback, useState } from 'react'

export const useToggle = (
  defaultValue = false
): [boolean, () => void, (value: boolean) => void] => {
  const [isToggled, setToggled] = useState(defaultValue)

  const toggle = useCallback(() => {
    setToggled((v) => !v)
  }, [])

  return [isToggled, toggle, setToggled]
}
