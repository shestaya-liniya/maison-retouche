import { trpc } from '@/api/trpc'

export const userActions = {
  fetchUser: (telegramId: number) => {
    trpc.vendorController.getByTelegramId.query({
      telegramId
    })
  }
}
