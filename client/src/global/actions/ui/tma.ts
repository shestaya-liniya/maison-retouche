import { setGlobalState } from '@/global'
import { global } from '@/global'
import { NoneToVoid } from '@/lib/common/types/misc'

export const tmaActions = {
  addBackButtonAction: (action: NoneToVoid) => {
    setGlobalState('backButtonActions', [...global.backButtonActions, action])
  },
  popBackButtonAction: () => {
    setGlobalState('backButtonActions', global.backButtonActions.slice(0, -1))
  }
}
