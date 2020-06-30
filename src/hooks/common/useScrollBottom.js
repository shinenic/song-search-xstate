import { useEffect } from 'react'

const useScrollBottom = (handleScrollBottom, bottomThreshold = 40) => {
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.pageYOffset)
        >= document.body.offsetHeight - bottomThreshold) {
        handleScrollBottom()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
}

export default useScrollBottom
