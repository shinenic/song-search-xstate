import { send } from 'xstate'

const menuState = {
  menu: {
    initial: 'closed',
    states: {
      closed: {
        on: {
          TOGGLE_MENU:
            { target: 'opened', actions: send('DISABLE_SEARCH_BOX') }
        }
      },
      opened: {
        on: {
          TOGGLE_MENU:
            { target: 'closed', actions: send('ENABLE_SEARCH_BOX') }
        }
      }
    }
  }
}

const searchBoxState = {
  searchBox: {
    initial: 'enable',
    states: {
      enable: {
        on: {
          CHANGE_INPUT: [
            { cond: 'withResultOnly', actions: ['cleanInput', 'cleanResult', send('TOGGLE_IDLE')] },
            // For query artist name or something immediately
            { cond: 'shouldSkipDebounce', actions: ['setInput', 'setKeyword', send('VERIFY_PARAMS')] },
            { actions: ['setInput', 'setKeyword', send('SEARCH_WITH_DEBOUNCE')] }
          ],
          TOGGLE_CLEAN: [
            { cond: 'withInput', actions: 'cleanInput' },
            { cond: 'withResultOnly', actions: ['cleanResult', send('TOGGLE_IDLE')] }
          ],
          DISABLE_SEARCH_BOX: 'disable'
        }
      },
      disable: {
        on: {
          ENABLE_SEARCH_BOX: 'enable'
        }
      }
    }
  }
}

const resultState = {
  result: {
    initial: 'idle',
    on: {
      TOGGLE_IDLE: {
        target: '.idle'
      },
      SEARCH_WITH_DEBOUNCE: {
        target: '.searchBuffer'
      },
      FETCH_MORE: {
        actions: 'setPage',
        target: '.verifyingParams'
      },
      VERIFY_PARAMS: {
        target: '.verifyingParams'
      }
    },
    states: {
      idle: {},
      searchBuffer: {
        entry: ['cancelSearch', 'sendSearchEventAfterDelay']
      },
      verifyingParams: {
        on: {
          '': [{ target: 'idle', cond: 'invalidParams' }, { target: 'searching' }]
        }
      },
      searching: {
        entry: ['setLoading', 'setNoError'],
        exit: ['setLoaded'],
        invoke: {
          id: 'fetch-result',
          src: 'fetchResult',
          onDone: [
            { target: 'noResult', cond: 'isNoResult' },
            { target: 'showResult', actions: 'setResult' }
          ],
          onError: {
            target: 'errorResult', actions: 'setError'
          }
        }
      },
      errorResult: {
        on: {
          RETRY: {
            target: 'searching'
          }
        }
      },
      noResult: { type: 'final' },
      showResult: { type: 'final' }
    }
  }
}

export default {
  ...resultState,
  ...searchBoxState,
  ...menuState
}