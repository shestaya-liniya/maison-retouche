import { setGlobalState } from '@/global'

export const screensActions = {
  setPaycheckCollectionEditIsOpen: (isOpen: boolean) => {
    setGlobalState('paycheckCollectionEditIsOpen', isOpen)
  }
}
