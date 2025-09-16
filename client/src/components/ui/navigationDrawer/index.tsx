import { Component, createSignal, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import NavigationDrawerTabBar from '@/components/ui/navigationDrawer/TabBar'
import { Icon } from '@/lib/common/types/misc'

import styles from './style.module.scss'

export type NavigationDrawerTabType = {
  name: string
  title: string
  Icon: Icon
  Component: Component
}

type OwnProps = {
  currentTab: string
  setCurrentTab: (name: string) => void
  tabs: NavigationDrawerTabType[]
}

const NavigationDrawer = (props: OwnProps) => {
  const [previousTab, setPreviousTab] = createSignal<string | undefined>(
    undefined
  )

  const [animationDirection, setAnimationDirection] = createSignal<
    'forward' | 'backward' | undefined
  >(undefined)

  const tabOrder: string[] = props.tabs.map(tab => tab.name)
  const tabComponents = Object.fromEntries(
    props.tabs.map(tab => [tab.name, tab.Component])
  )

  const handleTabChange = (tabName: string) => {
    const currentIndex = tabOrder.indexOf(props.currentTab)
    const newIndex = tabOrder.indexOf(tabName)

    setPreviousTab(props.currentTab)
    setAnimationDirection(newIndex > currentIndex ? 'forward' : 'backward')

    props.setCurrentTab(tabName)
  }

  const getCurrentTabClasses = () => {
    return `${styles.tab} ${styles.current} ${
      animationDirection() === 'forward'
        ? styles.slideInFromRight
        : styles.slideInFromLeft
    }`
  }

  const getPreviousTabClasses = () => {
    return `${styles.tab} ${styles.previous} ${
      animationDirection() === 'forward'
        ? styles.slideOutToLeft
        : styles.slideOutToRight
    }`
  }

  return (
    <div class="flex flex-col h-full">
      <div class="flex-1 relative overflow-hidden">
        <div class={getCurrentTabClasses()}>
          <Dynamic component={tabComponents[props.currentTab]} />
        </div>
        <Show when={previousTab()}>
          {previousTab => (
            <div class={getPreviousTabClasses()}>
              <Dynamic component={tabComponents[previousTab()]} />
            </div>
          )}
        </Show>
      </div>
      <NavigationDrawerTabBar
        currentTab={props.currentTab}
        setCurrentTab={handleTabChange}
        tabs={props.tabs}
      />
    </div>
  )
}

export default NavigationDrawer
