import { ApiPaycheckUI } from '@server/api/paycheck/type'

import { setGlobalState } from '@/global'

export const paycheckActions = {
  setCollectionDate: ({ month, year }: { month: number; year: number }) => {
    setGlobalState('paychecks', 'currentCollection', {
      month,
      year
    })
  },
  addPaycheck: (paycheckUI: ApiPaycheckUI) => {
    setGlobalState('paychecks', 'currentCollection', 'all', paychecks => [
      ...paychecks,
      paycheckUI
    ])
  }
}
