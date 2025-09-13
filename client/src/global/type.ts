import type { ApiPaycheck, ApiPaycheckUI } from '@server/api/paycheck/type'
import type { ApiVendor } from '@server/api/vendor/type'

export type GlobalState = {
  user?: ApiVendor
  paychecks: {
    fromApi: {
      isLoaded: boolean
      isLoading: boolean
      all: ApiPaycheck[]
    }
    fromLocalStorage: ApiPaycheck[]
    ui: {
      month: number | undefined
      all: ApiPaycheckUI[]
    }
  }

  backButtonActions: (() => void)[]
}
