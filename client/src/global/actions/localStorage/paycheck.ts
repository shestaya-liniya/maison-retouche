import { ApiPaycheck } from '@server/api/paycheck/type'

import { setGlobalState } from '@/global'
import { LocalStorageKeys } from '@/lib/localStorage/keys'

export const paycheckActions = {
  loadUnfinishedPaychecks: () => {
    const raw = localStorage.getItem(LocalStorageKeys.unfinishedPaychecks)
    const parsed = JSON.parse(raw ?? '[]') as ApiPaycheck[]

    setGlobalState('paychecks', 'fromLocalStorage', parsed)
  },
  saveUnfinishedPaychecks: (paychecks: ApiPaycheck[]) => {
    setGlobalState('paychecks', 'fromLocalStorage', paychecks)

    const raw = JSON.stringify(paychecks)
    localStorage.setItem(LocalStorageKeys.unfinishedPaychecks, raw)
  }
}
