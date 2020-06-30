import { useEffect } from 'react'

const useClickTouchOutside = (ref = null, handleClickTouchOutside) => {
  useEffect(() => {
    const handleEvent = e => {
      if (ref && !ref.current.contains(e.target)) {
        handleClickTouchOutside()
      }
    }
    document.addEventListener('mousedown', handleEvent)
    document.addEventListener('touchstart', handleEvent)

    return () => {
      document.removeEventListener('mousedown', handleEvent)
      document.removeEventListener('touchstart', handleEvent)
    }
  }, [ref, handleClickTouchOutside])
}

export default useClickTouchOutside
