import { useEffect, useState } from 'react'

const useDebounce = (
  handleTimeout,
  timeout = 0,
  deps = [] // DependencyList
) => {
  const [shouldCancel, setShouldClearResult] = useState(false)

  useEffect(() => {
    let timer = null
    const debounce = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        !shouldCancel && handleTimeout()
      }, timeout)
    }
    debounce()

    return () => { clearTimeout(timer) }
  }, [shouldCancel, ...deps])

  const cancel = () => {
    setShouldClearResult(true)
  }

  return cancel
}

export default useDebounce
