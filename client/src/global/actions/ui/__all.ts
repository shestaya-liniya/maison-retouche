import { paycheckActions } from '@/global/actions/ui/paycheck'
import { tmaActions } from '@/global/actions/ui/tma'

export const uiActions = {
  ...paycheckActions,
  ...tmaActions
}
