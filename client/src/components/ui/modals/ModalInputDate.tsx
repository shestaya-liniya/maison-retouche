import { createSignal } from 'solid-js'

import DatePicker from '@/components/ui/DatePicker'
import Modal, { ModalProps } from '@/components/ui/modals/Modal'
import Tappable from '@/components/ui/Tappable'
import { animationDuration } from '@/lib/common/const/animation'

type OwnProps = ModalProps & {
  title: string
  description: string
  onSubmit: (value: string) => void
}

const ModalInput = (props: OwnProps) => {
  const [selectedDate, setSelectedDate] = createSignal('')

  const handleSubmit = () => {
    props.onClose()
    setTimeout(() => {
      props.onSubmit(selectedDate())
    }, animationDuration.default)
  }

  return (
    <Modal {...props}>
      <div class="text-xl font-medium">{props.title}</div>
      <div>{props.description}</div>
      <DatePicker
        type="month"
        isRounded
        onInput={value => setSelectedDate(value)}
      />
      <div class="flex justify-end gap-6">
        <Tappable
          class="rounded-lg text-accent font-medium px-2 py-1"
          onClick={props.onClose}
        >
          Отменить
        </Tappable>
        <Tappable
          class="rounded-lg text-accent font-medium px-2 py-1"
          isDisabled={selectedDate().length === 0}
          onClick={handleSubmit}
        >
          ОК
        </Tappable>
      </div>
    </Modal>
  )
}

export default ModalInput
