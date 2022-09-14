import { SetValue } from "@bayzzer/commons"
import { useCallback, useEffect, useState } from "react"
import { useEventCallback, useEventListener, useWindow } from "@bayzzer/hooks"
import { parseJSON } from "bayzzer-tools"

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

export const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const {
    isServer
  } = useWindow()

  const readValue = useCallback((): T => {

    if (isServer) return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback(value => {
    // Prevent build error "window is undefined" but keeps working
    if (isServer) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      )
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      // Save state
      setStoredValue(newValue)

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  })

  useEffect(() => {
    setStoredValue(readValue())
  }, [])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }
      setStoredValue(readValue())
    },
    [key, readValue],
  )

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange)

  return [storedValue, setValue]
}