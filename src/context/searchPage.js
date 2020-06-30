import React, { createContext, useContext } from 'react'
import { get } from 'lodash'
import { useMachine } from '@xstate/react';
import { ZhuoZhuSearchMachine } from 'machine/index'

const SearchPageContext = createContext()

export const useSearchPageContext = () => useContext(SearchPageContext)

/* 
  TODOS:
    1. Incognito & History: record and send history to server and localstore when Incognito mode off
    2. Implement menu for other pages
*/
const SearchPageProvider = ({ children }) => {
  const [state, send] = useMachine(ZhuoZhuSearchMachine)

  // For Debug
  // console.table(state.value)
  // console.log(state.context)

  const getSendActions = () => ({
    sendChangeInput: (input, skipDebounce = false) => send({ type: 'CHANGE_INPUT', input, skipDebounce }),
    sendToggleClean: () => send('TOGGLE_CLEAN'),
    sendFetchMore: page => send({ type: 'FETCH_MORE', page }),
    sendRetry: () => send({ type: 'RETRY', retry: true }),
  })

  const getSearchPageContext = () => {
    const { context } = state
    return {
      state,
      send,
      context,
      searchKeywordLoading: context.loading && get(context, ['variables', 'page'], 1) === 1,
      fetchMoreLoading: context.loading && get(context, ['variables', 'page'], 1) !== 1,
      ...getSendActions()
    }
  }

  return (
    <SearchPageContext.Provider value={getSearchPageContext()}>
      {children}
    </SearchPageContext.Provider>
  )
}

export default SearchPageProvider
