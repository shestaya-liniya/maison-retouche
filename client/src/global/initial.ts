import type { GlobalState } from './type'

export const INITIAL_GLOBAL_STATE: GlobalState = {
  paychecks: {
    fromApi: {
      isLoaded: false,
      isLoading: false,
      all: []
    },
    fromLocalStorage: [],
    currentCollection: {
      month: undefined,
      all: []
    }
  },

  backButtonActions: []
}
