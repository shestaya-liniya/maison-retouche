import type { ApiPaycheck } from '@server/api/paycheck/type'
import type { ApiVendor } from '@server/api/vendor/type'

export type GlobalState = {
  user?: ApiVendor
  paychecks: {
    isLoaded: boolean
    isLoading: boolean
    all: ApiPaycheck[]
  }
  unfinishedPaychecks: ApiPaycheck[]

  backButtonActions: (() => void)[]
}
