import type { GlobalState } from './type'

export const INITIAL_GLOBAL_STATE: GlobalState = {
  paychecks: {
    isLoaded: false,
    isLoading: false,
    all: []
  },
  unfinishedPaychecks: []
}
