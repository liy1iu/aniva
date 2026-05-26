import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../services/localStorage'

export function useLocalStorage(key, fallback) {
  // starts with saved data or the fallback
  const [value, setValue] = useState(() => readStorage(key, fallback))

  useEffect(() => {
    // syncs changes to localstorage
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue]
}
