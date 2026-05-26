const PREFIX = 'aniva:'

export function readStorage(key, fallback) {
  // reads carefully in case saved data is invalid
  try {
    const value = window.localStorage.getItem(`${PREFIX}${key}`)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  // adds a prefix to avoid mixing with other browser data
  window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value))
}
