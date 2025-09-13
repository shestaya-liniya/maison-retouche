import { paycheckActions } from '@/global/actions/api/paycheck'
import { userActions } from '@/global/actions/api/user'

export const apiActions = {
  ...paycheckActions,
  ...userActions
}
