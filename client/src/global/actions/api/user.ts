import { retrieveLaunchParams } from '@telegram-apps/sdk-solid'

import { trpc } from '@/api/trpc'
import { setGlobalState } from '@/global'

export const userActions = {
  fetchUser: async () => {
    const lp = retrieveLaunchParams()
    const user = lp.tgWebAppData?.user

    if (!user) return

    const apiUser = await trpc.vendorController.getByTelegramId.query({
      telegramId: user.id
    })

    console.log(apiUser)

    setGlobalState('user', apiUser)
  }
}
