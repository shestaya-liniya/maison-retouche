import { userActions } from '@/global/actions/api/user'
import { localStoragePaycheckActions } from '@/global/actions/localStorage/paycheck'

const actions = {
  ...userActions,
  ...localStoragePaycheckActions
}

export const getActions = () => actions
