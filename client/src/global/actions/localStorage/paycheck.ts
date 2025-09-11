import { ApiPaycheck } from '@server/api/paycheck/type'

import { setGlobalState } from '@/global'
import { LocalStorageKeys } from '@/lib/localStorage/keys'

export const localStoragePaycheckActions = {
  loadUnfinishedPaychecks: () => {
    const raw = localStorage.getItem(LocalStorageKeys.unfinishedPaychecks)
    const parsed = JSON.parse(raw) as ApiPaycheck[]

    setGlobalState('unfinishedPaychecks', parsed ?? [])
  },
  saveUnfinishedPaychecks: (paychecks: ApiPaycheck[]) => {
    setGlobalState('unfinishedPaychecks', paychecks)

    const raw = JSON.stringify(paychecks)
    localStorage.setItem(LocalStorageKeys.unfinishedPaychecks, raw)
  }
}
