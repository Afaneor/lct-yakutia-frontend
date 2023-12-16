import React, { useEffect } from 'react'

/**
 * Уведомляем, если кликнули вне элемента
 */
export function useOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutsideClick])
}
