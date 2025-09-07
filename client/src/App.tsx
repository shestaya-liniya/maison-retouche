import { initData, useSignal } from '@telegram-apps/sdk-solid'

const App = () => {
  const initDataState = useSignal(initData.state)

  return (
    <div class="h-full flex flex-col items-center justify-center">
      <div class="text-2xl font-medium">TMA Template</div>
      {initDataState()?.user.username}
    </div>
  )
}

export default App
