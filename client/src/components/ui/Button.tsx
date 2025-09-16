import { mergeProps, type ParentProps } from 'solid-js'
import { twMerge } from 'tailwind-merge'

import Tappable from './Tappable'

type OwnProps = ParentProps<{
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'transparent'
  isRound?: boolean
  isDisabled?: boolean
  class?: string
}>

const Button = (props: OwnProps) => {
  props = mergeProps({ variant: 'primary' }, props) as OwnProps

  const className = twMerge(
    'inline-flex overflow-hidden bg-button rounded-lg select-none px-4 py-2 font-medium',
    props.variant === 'transparent' && 'bg-transparent text-accent',
    props.isRound && 'rounded-full',
    props.class
  )

  return (
    <div
      classList={{
        'opacity-50': props.isDisabled
      }}
    >
      <Tappable
        onClick={props.onClick}
        class={className}
        isDisabled={props.isDisabled}
      >
        <div>{props.children}</div>
      </Tappable>
    </div>
  )
}

export default Button
