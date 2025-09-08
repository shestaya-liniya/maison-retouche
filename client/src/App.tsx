import { initData, useSignal } from '@telegram-apps/sdk-solid'
import { createSignal, onMount } from 'solid-js'

import { trpc } from '@/api/trpc'

const App = () => {
  const initDataState = useSignal(initData.state)
  const [vendorFirstname, setVendorFirstname] = createSignal<
    string | undefined
  >(undefined)

  onMount(() => {
    trpc.vendorController.getByTelegramId
      .query({
        telegramId: initDataState().user.id
      })
      .then(res => {
        setVendorFirstname(res.firstName)
      })
  })

  return (
    <div class="h-full flex flex-col items-center justify-center">
      <div class="text-2xl font-medium">TMA Template</div>
      {vendorFirstname()}
    </div>
  )
}

export default App
