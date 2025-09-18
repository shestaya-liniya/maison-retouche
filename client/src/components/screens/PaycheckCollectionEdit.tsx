import { mainButton } from '@telegram-apps/sdk-solid'
import { createMemo, createSignal } from 'solid-js'
import { reconcile } from 'solid-js/store'

import PaycheckForm, { PaycheckFormData } from '@/components/PaycheckForm'
import Button from '@/components/ui/Button'
import ModalConfirm from '@/components/ui/modals/ModalConfirm'
import Screen from '@/components/ui/Screen'
import { getGlobal, setGlobalState } from '@/global'
import { getActions } from '@/global/actions'

const PaycheckCollectionEdit = () => {
  const { setCollectionPaycheckInEdit, setPaycheckCollectionEditIsOpen } =
    getActions()
  const global = getGlobal()
  const editingPaycheck = createMemo(
    () => global.paychecks.currentCollection.paycheckInEditing
  )

  const [confirmDeleteModalIsOpen, setConfirmModalIsOpen] = createSignal(false)

  let submitTriggerRef: HTMLDivElement | undefined

  const handleClose = () => {
    setPaycheckCollectionEditIsOpen(false)
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({
        isVisible: false
      })
    }
  }

  const handleCancel = () => {
    setCollectionPaycheckInEdit(undefined)
    handleClose()
  }

  const handleSubmit = (paycheckFormData: PaycheckFormData) => {
    setGlobalState(
      'paychecks',
      'currentCollection',
      'all',
      field => field.id === editingPaycheck()?.id,
      paycheckFormData
    )
    handleClose()
  }

  const handleDelete = () => {
    setGlobalState(
      'paychecks',
      'currentCollection',
      'all',
      reconcile(
        global.paychecks.currentCollection.all.filter(
          field => field.id !== editingPaycheck()?.id
        )
      )
    )
    handleClose()
  }

  if (mainButton.setParams.isAvailable()) {
    mainButton.setParams({
      backgroundColor: '#ee686f',
      isEnabled: true,
      isVisible: true,
      text: 'Delete',
      textColor: '#ffffff'
    })
    mainButton.onClick(() => setConfirmModalIsOpen(true))
  }

  return (
    <Screen
      isOpen={global.paycheckCollectionEditIsOpen}
      onClose={handleClose}
      animation="fade"
      class="relative"
    >
      <div class="flex justify-between px-4 py-2">
        <Button variant="transparent" onClick={handleCancel}>
          Отменить
        </Button>
        <div ref={submitTriggerRef}>
          <Button variant="transparent">Готово</Button>
        </div>
      </div>
      <PaycheckForm
        triggerRef={submitTriggerRef!}
        handleSubmit={handleSubmit}
        values={editingPaycheck()}
      />
      <ModalConfirm
        isOpen={confirmDeleteModalIsOpen()}
        onClose={() => setConfirmModalIsOpen(false)}
        title="Вы уверены?"
        description="Удалить запись"
        onConfirm={handleDelete}
      />
      <div class="w-full absolute bottom-4 px-4 ">
        <Button
          class="w-full bg-destructive"
          onClick={() => setConfirmModalIsOpen(true)}
        >
          Удалить
        </Button>
      </div>
    </Screen>
  )
}

export default PaycheckCollectionEdit
