import { userActions } from '@/global/actions/api/user'

const actions = {
  ...userActions
}

export const getActions = () => actions
