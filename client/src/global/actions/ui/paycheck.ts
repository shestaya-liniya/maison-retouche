import { ApiPaycheckUI } from '@server/api/paycheck/type'

import { setGlobalState } from '@/global'

export const paycheckActions = {
  setMonth: (month: number) => {
    setGlobalState('paychecks', 'ui', 'month', month)
  },
  addPaycheck: (paycheckUI: ApiPaycheckUI) => {
    setGlobalState('paychecks', 'ui', 'all', paychecks => [
      ...paychecks,
      paycheckUI
    ])
  }
}
