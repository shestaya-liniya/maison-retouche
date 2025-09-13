import { ApiPaycheckInput } from '@server/api/paycheck/type'
import { createStore } from 'solid-js/store'

import { PaycheckFormData } from '@/components/edit/newMonthlyEntry/PaycheckForm'
import PaycheckForm from '@/components/edit/newMonthlyEntry/PaycheckForm'
import Button from '@/components/ui/Button'
import Screen from '@/components/ui/Screen'
import { getGlobal } from '@/global'
import { NoneToVoid } from '@/lib/common/types/misc'

type OwnProps = {
  isOpen: boolean
  onClose: NoneToVoid
}

const NewMonthlyEntry = (props: OwnProps) => {
  const global = getGlobal()
  const [monthlyPaychecks, setMonthlyPaychecks] = createStore<
    ApiPaycheckInput[]
  >([])

  let addPaycheckTriggerRef: HTMLDivElement

  const handleAddPaycheck = (data: PaycheckFormData) => {
    const paycheckBody: ApiPaycheckInput = {
      ...data,
      vendorId: global.user?.id
    }

    setMonthlyPaychecks([...monthlyPaychecks, paycheckBody])
  }

  return (
    <Screen isOpen={props.isOpen} onClose={props.onClose} animation="slide">
      <div class="flex items-center justify-between px-2 mb-2">
        <div class="flex-1">
          <Button variant="transparent" onClick={() => {}}>
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
    </Screen>
  )
}

export default NewMonthlyEntry
