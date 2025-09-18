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
      year: undefined,
      maxIncome: 1000,
      all: [],
      paycheckInEditing: undefined
    }
  },

  paycheckCollectionEditIsOpen: false,
  backButtonActions: []
}
