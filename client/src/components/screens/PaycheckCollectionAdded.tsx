import { ApiPaycheckUI } from '@server/api/paycheck/type'
import { For } from 'solid-js'

import PaycheckPreview from '@/components/PaycheckPreview'
import Screen from '@/components/ui/Screen'
import { NoneToVoid } from '@/lib/common/types/misc'

type OwnProps = {
  isOpen: boolean
  onClose: NoneToVoid
  paychecksInput: ApiPaycheckUI[]
}

const PaycheckCollectionAdded = (props: OwnProps) => {
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

export default PaycheckCollectionAdded
