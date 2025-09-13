import { ApiPaycheckUI } from '@server/api/paycheck/type'

import { setGlobalState } from '@/global'

export const paycheckActions = {
  setMonth: (month: number) => {
    setGlobalState('paychecks', 'currentCollection', 'month', month)
  },
  addPaycheck: (paycheckUI: ApiPaycheckUI) => {
    setGlobalState('paychecks', 'currentCollection', 'all', paychecks => [
      ...paychecks,
      paycheckUI
    ])
  }
}
