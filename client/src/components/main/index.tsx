import { createSignal } from 'solid-js'

import { MainTabs } from '@/components/main/tabs'
import NavigationDrawer from '@/components/ui/navigationDrawer'

const Main = () => {
  const [currentTab, setCurrentTab] = createSignal(MainTabs[0].name)
  return (
    <div class="h-full">
      <NavigationDrawer
        currentTab={currentTab()}
        setCurrentTab={setCurrentTab}
        tabs={MainTabs}
      />
    </div>
  )
}

export default Main
