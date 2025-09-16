import { ApiPaycheckUI } from '@server/api/paycheck/type'
import { createMemo, createSignal } from 'solid-js'

import PaycheckForm, { PaycheckFormData } from '@/components/PaycheckForm'
import PaycheckCollectionAdded from '@/components/screens/PaycheckCollectionAdded'
import Button from '@/components/ui/Button'
import Screen from '@/components/ui/Screen'
import { getGlobal } from '@/global'
import { getActions } from '@/global/actions'
import { NoneToVoid } from '@/lib/common/types/misc'

type OwnProps = {
  isOpen: boolean
  onClose: NoneToVoid
}

const PaycheckCollection = (props: OwnProps) => {
  const global = getGlobal()
  const collectionState = createMemo(
    () => global.paychecks.currentCollection.all
  )

  const { addPaycheck } = getActions()

  const [addedScreenIsOpen, setAddedScreenIsOpen] = createSignal(false)

  let addPaycheckTriggerRef: HTMLDivElement

  const handleAddPaycheck = (data: PaycheckFormData) => {
    if (!global.user) return

    const paycheckUI: ApiPaycheckUI = {
      ...data,
      vendorId: global.user?.id
    }

    addPaycheck(paycheckUI)
  }

  return (
    <Screen isOpen={props.isOpen} onClose={props.onClose} animation="slide">
      <div class="flex items-center justify-between px-2 mb-2">
        <div class="flex-1">
          <Button
            variant="transparent"
            isDisabled={collectionState().length === 0}
            onClick={() => {
              setAddedScreenIsOpen(true)
            }}
          >
            Все чеки
          </Button>
        </div>
        <div>
          <span class="text-accent">700€</span>
          <span class="text-hint"> / 1000€</span>
        </div>
        <div class="flex-1 flex justify-end">
          <div ref={addPaycheckTriggerRef!}>
            <Button variant="transparent">Далее</Button>
          </div>
        </div>
      </div>
      <PaycheckForm
        triggerRef={addPaycheckTriggerRef!}
        handleSubmit={handleAddPaycheck}
      />
      <PaycheckCollectionAdded
        isOpen={addedScreenIsOpen()}
        onClose={() => setAddedScreenIsOpen(false)}
        paychecksInput={collectionState()}
      />
    </Screen>
  )
}

export default PaycheckCollection
