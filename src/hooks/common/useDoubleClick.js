import { useRef, useEffect } from 'react'

const SINGLE_TAP_TIME_OUT = 450

const useDoubleClick = (onDoubleClick) => {
  const ref = useRef()

  useEffect(() => {
    let clickTimeout = null
    let lastTapTime = 0
    const target = ref.current

    const handleDoubleClick = (event) => {
      const currentTime = new Date().getTime()
      const tapLengthOfTime = currentTime - lastTapTime
      clearTimeout(clickTimeout)

      if (tapLengthOfTime > 0 && tapLengthOfTime < SINGLE_TAP_TIME_OUT) {
        onDoubleClick()
        event.preventDefault()
      } else {
        clickTimeout = setTimeout(() => { clearTimeout(clickTimeout) }, SINGLE_TAP_TIME_OUT)
      }
      lastTapTime = currentTime
    }

    target.addEventListener('click', handleDoubleClick)
    return () => {
      target.removeEventListener('click', handleDoubleClick)
    }
  })
  return ref
}

export default useDoubleClick
