import { For } from 'solid-js'

import { NavigationDrawerTabType } from '@/components/ui/navigationDrawer'
import NavigationDrawerTab from '@/components/ui/navigationDrawer/Tab'

type OwnProps = {
  tabs: NavigationDrawerTabType[]
  currentTab: string
  setCurrentTab: (tab: string) => void
}

const NavigationDrawerTabBar = (props: OwnProps) => {
  return (
    <div class="py-1 bg-background">
      <div class="flex items-center justify-center h-full">
        <For each={props.tabs}>
          {tab => (
            <NavigationDrawerTab
              title={tab.title}
              Icon={tab.Icon}
              onSelect={() => props.setCurrentTab(tab.name)}
              isSelected={props.currentTab === tab.name}
            />
          )}
        </For>
      </div>
    </div>
  )
}

export default NavigationDrawerTabBar
