import { send, assign, actions } from 'xstate'
import { removeAllWhiteSpaces } from 'utils/base'
import { get } from 'lodash'
const { cancel } = actions

const SEARCH_DEBOUNCE_TIME = 100

const setActions = {
  setInput: assign({ input: (_, e) => e.input || '' }),
  cleanInput: assign({ input: '' }),
  cleanResult: assign({ result: [] }),
  setResult: assign({
    result: (ctx, e) => {
      if (get(e, ['data', 'songs', 'pagination', 'currentPage'], 1) > 1) {
        return [...ctx.result, ...get(e, ['data', 'songs', 'result'], [])]
      }
      return get(e, ['data', 'songs', 'result'], [])
    },
    pagination: (_, e) => get(e, ['data', 'songs', 'pagination'], {}),
  }),
  setLoading: assign({ loading: true }),
  setLoaded: assign({ loading: false }),
  setNoError: assign({ error: null }),
  setError: assign({ error: (_, e) => e.data || true }),
  setKeyword: assign({
    variables: (_, e) => ({
      keyword: removeAllWhiteSpaces(e.input || ''),
      page: 1
    })
  }),
  setPage: assign({
    variables: (ctx, e) => ({
      ...ctx.variables,
      page: e.page || 1
    })
  })
}

const debounceSearchActions = {
  sendSearchEventAfterDelay: send('VERIFY_PARAMS', {
    delay: SEARCH_DEBOUNCE_TIME,
    id: 'debounced-search'
  }),
  cancelSearch: cancel('debounced-search'),
}

export default {
  ...setActions,
  ...debounceSearchActions
}