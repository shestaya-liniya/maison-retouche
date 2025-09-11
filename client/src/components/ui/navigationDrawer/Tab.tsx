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
    twMerge(
      'h-6 w-6 transition-color duration-150 ease-in-out',
      props.isSelected ? 'text-accent' : 'text-link/30'
    )
  )

  return (
    <Tappable
      onPointerDown={handleSelect}
      class="w-20 py-2 flex flex-col items-center gap-1 rounded-xl"
    >
      <props.Icon class={iconClassName()} />
      <div
        class="px-2 py-0.5 text-xs font-medium transition-color duration-150 ease-in-out"
        classList={{
          'text-accent rounded-full': props.isSelected,
          'text-link/50': !props.isSelected
        }}
      >
        {props.title}
      </div>
    </Tappable>
  )
}

export default NavigationDrawerTab
