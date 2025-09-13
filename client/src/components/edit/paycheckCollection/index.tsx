import { ApiPaycheckUI } from '@server/api/paycheck/type'
import { createMemo, createSignal } from 'solid-js'

import AllPaychecks from '@/components/edit/paycheckCollection/allPaychecks'
import PaycheckForm, {
  PaycheckFormData
} from '@/components/edit/paycheckCollection/PaycheckForm'
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
  const paychecksUIState = createMemo(() => global.paychecks.ui.all)

  const { addPaycheck } = getActions()

  const [allPaychecksIsOpen, setAllPaychecksIsOpen] = createSignal(false)

  let addPaycheckTriggerRef: HTMLDivElement

  const handleAddPaycheck = (data: PaycheckFormData) => {
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
            isDisabled={paychecksUIState().length === 0}
            onClick={() => {
              setAllPaychecksIsOpen(true)
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
          <div ref={addPaycheckTriggerRef}>
            <Button variant="transparent">Далее</Button>
          </div>
        </div>
      </div>
      <PaycheckForm
        triggerRef={addPaycheckTriggerRef}
        handleSubmit={handleAddPaycheck}
      />
      <AllPaychecks
        isOpen={allPaychecksIsOpen()}
        onClose={() => setAllPaychecksIsOpen(false)}
        paychecksInput={paychecksUIState()}
      />
    </Screen>
  )
}

export default PaycheckCollection
