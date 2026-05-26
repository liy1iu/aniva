import { useEffect, useState } from 'react'

// returns a value only after it chills for the delay
export function useDebounce(value, delay = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // waits before publishing the latest value
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(timeout)
  }, [delay, value])

  return debouncedValue
}
