import { type Component, createMemo } from 'solid-js'
import { twMerge } from 'tailwind-merge'

import Tappable from '@/components/ui/Tappable'

type OwnProps = {
  title: string
  Icon: Component<{ class?: string }>
  onSelect: () => void
  isSelected?: boolean
}

const NavigationDrawerTab = (props: OwnProps) => {
  const handleSelect = () => {
    if (!props.isSelected) {
      props.onSelect()
    }
  }
  const iconClassName = createMemo(() =>
    twMerge('h-8 w-8', props.isSelected ? 'text-accent' : 'text-link/30')
  )

  return (
    <Tappable
      onPointerDown={handleSelect}
      class="px-4 py-2 flex flex-col items-center gap-1 rounded-full"
    >
      <props.Icon class={iconClassName()} />
    </Tappable>
  )
}

export default NavigationDrawerTab
