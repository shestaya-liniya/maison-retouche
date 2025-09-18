import Modal, { ModalProps } from '@/components/ui/modals/Modal'
import Tappable from '@/components/ui/Tappable'
import { NoneToVoid } from '@/lib/common/types/misc'

type OwnProps = ModalProps & {
  title: string
  description: string
  onConfirm: NoneToVoid
}

const ModalConfirm = (props: OwnProps) => {
  return (
    <Modal {...props} visibleBackdrop={true}>
      <div class="text-xl font-medium">{props.title}</div>
      <div>{props.description}</div>
      <div class="flex justify-end gap-6">
        <Tappable
          class="rounded-lg text-accent font-medium px-2 py-1"
          onClick={props.onClose}
        >
          Отменить
        </Tappable>
        <Tappable
          class="rounded-lg text-accent font-medium px-2 py-1"
          onClick={props.onConfirm}
        >
          ОК
        </Tappable>
      </div>
    </Modal>
  )
}

export default ModalConfirm
