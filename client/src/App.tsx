import { backButton } from '@telegram-apps/sdk-solid'
import { createEffect, createMemo } from 'solid-js'

import Main from '@/components/Main'
import { getGlobal } from '@/global'
import { getActions } from '@/global/actions'

const App = () => {
  const global = getGlobal()
  const { popBackButtonAction } = getActions()

  let backButtonCurrentAction: (() => void) | null = null
  createEffect(() => {
    if (!backButton.isSupported) return

    const actions = createMemo(() => global.backButtonActions)

    if (backButtonCurrentAction) {
      backButton.offClick(backButtonCurrentAction)
    }

    if (actions().length > 0) {
      backButtonCurrentAction = () => {
        global.backButtonActions[global.backButtonActions.length - 1]()
        popBackButtonAction()
      }
      backButton.onClick(backButtonCurrentAction)
      backButton.show()
    } else {
      backButtonCurrentAction = null
      backButton.hide()
    }
  })

  return (
    <div class="h-full">
      <Main />
    </div>
  )
}

export default App
