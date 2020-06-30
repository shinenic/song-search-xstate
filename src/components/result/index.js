import React from 'react'
import { useSearchPageContext } from 'context/searchPage'
import Idle from './idle'
import NoResult from './noResult'
import Error from './error'
import ShowResult from './showResult'

const Result = () => {
  const { state } = useSearchPageContext()
  const { value: { result: resultState } } = state

  if (resultState === 'idle') return <Idle />

  if (resultState === 'errorResult') return <Error />

  if (resultState === 'noResult') return <NoResult />

  return <ShowResult />
}

export default Result
