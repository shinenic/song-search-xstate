import { Machine } from 'xstate'
import states from './fsm'
import guards from './guards'
import actions from './actions'
import services from './services'

const initialContext = {
  input: '',
  result: [],
  pagination: {},
  loading: false,
  error: null,
  variables: {
    keyword: '',
    page: 1
  }
}

export const ZhuoZhuSearchMachine = Machine({
  id: 'ZhuoZhuSearch',
  context: initialContext,
  type: 'parallel',
  states
}, {
  actions,
  guards,
  services
})
