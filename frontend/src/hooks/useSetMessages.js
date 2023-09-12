import { useState, useCallback } from 'react'
let timeoutId = ''

export function useSetMessages () {
  const [message, setMessage] = useState({})

  const showMessage = useCallback(({ type, text }) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setMessage({ type, text })
    timeoutId = setTimeout(() => {
      setMessage({})
    }, 2500)
  }, [])

  return { message, showMessage }
}
