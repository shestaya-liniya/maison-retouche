import { paycheckActions } from '@/global/actions/ui/paycheck'
import { screensActions } from '@/global/actions/ui/screens'
import { tmaActions } from '@/global/actions/ui/tma'

export const uiActions = {
  ...paycheckActions,
  ...tmaActions,
  ...screensActions
}
