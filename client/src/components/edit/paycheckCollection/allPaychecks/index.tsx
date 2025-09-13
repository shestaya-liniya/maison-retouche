import { ApiPaycheckUI } from '@server/api/paycheck/type'
import { For } from 'solid-js'

import PaycheckPreview from '@/components/edit/paycheckCollection/allPaychecks/PaycheckPreview'
import Screen from '@/components/ui/Screen'
import { NoneToVoid } from '@/lib/common/types/misc'

type OwnProps = {
  isOpen: boolean
  onClose: NoneToVoid
  paychecksInput: ApiPaycheckUI[]
}

const AllPaychecks = (props: OwnProps) => {
  return (
    <Screen isOpen={props.isOpen} onClose={props.onClose} animation="fade">
      <div class="space-y-2">
        <For each={props.paychecksInput}>
          {paycheckInput => <PaycheckPreview {...paycheckInput} />}
        </For>
      </div>
    </Screen>
  )
}

export default AllPaychecks
