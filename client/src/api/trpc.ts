import type { AppRouter } from '@server/trpc/router'
import { retrieveRawInitData } from '@telegram-apps/sdk-solid'
import { createTRPCClient, httpBatchLink } from '@trpc/client'

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      headers: () => {
        const initDataRaw = retrieveRawInitData()
        return initDataRaw ? { 'tma-session': initDataRaw } : {}
      }
    })
  ]
})
