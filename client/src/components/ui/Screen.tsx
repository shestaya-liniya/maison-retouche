import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  type ParentProps,
  Show
} from 'solid-js'
import { Portal } from 'solid-js/web'
import { twMerge } from 'tailwind-merge'

import { getActions } from '@/global/actions'
import { SLIDING_ANIMATION_MS } from '@/lib/common/const/animation'

import Button from './Button'
import styles from './Screen.module.scss'

type OwnProps = ParentProps<{
  isOpen: boolean
  onClose: () => void
  animation: 'slide' | 'fade'
  onOpen?: () => void
  onBeforeClose?: () => void
  showBackButton?: boolean
  class?: string
}>

const Screen = (props: OwnProps) => {
  props = mergeProps({ showBackButton: true }, props)

  const { addBackButtonAction } = getActions()
  const [isClosing, setIsClosing] = createSignal(false)

  const handleClose = () => {
    setIsClosing(true)
    props.onBeforeClose?.()

    setTimeout(() => {
      props.onClose?.()
      setIsClosing(false)
    }, SLIDING_ANIMATION_MS)
  }

  createEffect(
    on(
      () => props.isOpen,
      isOpen => {
        if (isOpen) {
          props.onOpen?.()

          if (props.showBackButton) {
            addBackButtonAction(handleClose)
          }
        } else {
          if (!isClosing()) {
            handleClose()
          }
        }
      },
      { defer: true }
    )
  )

  const contentClassName = twMerge(styles.content, props.class)

  return (
    <Show when={props.isOpen || isClosing()}>
      <Portal mount={document.querySelector('#screens-root') || undefined}>
        <div
          class={styles.wrapper}
          classList={{
            [styles.closing]: isClosing(),
            [styles.backdrop]: props.animation === 'slide'
          }}
          onClick={props.onClose}
        >
          <div
            class={contentClassName}
            classList={{
              [styles.slide]: props.animation === 'slide',
              [styles.fade]: props.animation === 'fade'
            }}
            onClick={e => e.stopPropagation()}
          >
            <Show when={import.meta.env.DEV}>
              <Button
                onClick={handleClose}
                class="absolute bottom-0 right-0 opacity-20 z-20"
              >
                Back
              </Button>
            </Show>
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  )
}

export default Screen
