import { useState, useRef, useEffect } from 'react'
import { debounce } from 'lodash'

const SMOOTH_LOADING_TIME = 1500 // millisecond

const useSmoothLoading = (isLoading) => {
  const [showLoading, setShowLoading] = useState(isLoading)

  const cancelLoading = useRef(debounce(async () => {
    setShowLoading(false)
  }, SMOOTH_LOADING_TIME))


  useEffect(() => {
    const handleLoading = () => {
      isLoading ? setShowLoading(true) : cancelLoading.current()
    }

    handleLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return { showLoading, setShowLoading }
}

export default useSmoothLoading