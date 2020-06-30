import React from 'react'
import { useSearchPageContext } from 'context/searchPage'

const Idle = () => {
  const { sendRetry } = useSearchPageContext()

  return (
    <div className="error-result">
      An error occurred, please&nbsp;
        <span className="error-result__retry" onClick={sendRetry}>
        try again
        </span>
      .
    </div>
  )
}

export default Idle
