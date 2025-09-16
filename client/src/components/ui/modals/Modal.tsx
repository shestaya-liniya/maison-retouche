import { createEffect, createSignal, on, ParentProps, Show } from 'solid-js'
import { Portal } from 'solid-js/web'

import { animationDuration } from '@/lib/common/const/animation'
import { NoneToVoid } from '@/lib/common/types/misc'

import styles from './Modal.module.scss'

export type ModalProps = {
  isOpen: boolean
  onClose: NoneToVoid
  visibleBackdrop?: boolean
}

type OwnProps = ParentProps<ModalProps>

const Modal = (props: OwnProps) => {
  let timeoutRef: NodeJS.Timeout | undefined

  const [isClosing, setIsClosing] = createSignal(false)

  const startClosing = () => {
    timeoutRef = setTimeout(() => {
      props.onClose?.()

      setIsClosing(false)
    }, animationDuration.default)
  }

  const resetClosing = () => {
    clearTimeout(timeoutRef)
    timeoutRef = undefined
  }

  const handleClose = () => {
    setIsClosing(true)
    startClosing()
  }

  createEffect(
    on(
      () => props.isOpen,
      isOpen => {
        if (!isOpen) {
          handleClose()
        } else {
          console.log('here')
          resetClosing()
        }
      },
      { defer: true }
    )
  )

  return (
    <Show when={props.isOpen || isClosing()}>
      <Portal mount={document.querySelector('#modals-root') || undefined}>
        <div
          class="absolute top-0 left-0 h-screen w-screen z-50 transition-height duration-300 ease-in-out"
          onClick={() => handleClose()}
          classList={{
            [styles.backdrop]: props.visibleBackdrop,
            [styles.closing]: isClosing()
          }}
        >
          <div
            class="absolute bg-background/50 backdrop-blur-md rounded-lg animate-fadeIn-scale"
            style={'top: 50%; left: 50%; transform: translate(-50%, -50%)'}
            onClick={e => e.stopPropagation()}
            classList={{
              [styles.closing]: isClosing()
            }}
          >
            <div class="bg-foreground px-6 py-4 rounded-lg min-w-[300px] flex flex-col gap-4">
              {props.children}
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  )
}

export default Modal
