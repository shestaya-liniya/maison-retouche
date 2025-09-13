import { apiActions } from '@/global/actions/api/__all'
import { localStorageActions } from '@/global/actions/localStorage/__all'
import { uiActions } from '@/global/actions/ui/__all'

const actions = {
  ...apiActions,
  ...localStorageActions,
  ...uiActions
}

export const getActions = () => actions
