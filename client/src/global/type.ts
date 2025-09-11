import type { ApiPaycheck } from '@server/api/paycheck/type'

export type GlobalState = {
  paychecks: {
    isLoaded: boolean
    isLoading: boolean
    all: ApiPaycheck[]
  }
  unfinishedPaychecks: ApiPaycheck[]
}
