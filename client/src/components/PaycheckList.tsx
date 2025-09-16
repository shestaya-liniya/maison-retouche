import { createMemo, createSignal, Match, onMount, Switch } from 'solid-js'

import PaycheckCollection from '@/components/screens/PaycheckCollection'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import { getGlobal } from '@/global'
import { getActions } from '@/global/actions'

const PaycheckList = () => {
  const global = getGlobal()
  const paychecksState = createMemo(() => global.paychecks)
  const { loadUnfinishedPaychecks } = getActions()

  const [collectionScreenIsOpen, setCollectionScreenIsOpen] =
    createSignal(false)

  onMount(() => {
    loadUnfinishedPaychecks()
  })

  return (
    <div class="h-full flex flex-col">
      <Switch>
        <Match when={paychecksState().fromLocalStorage.length === 0}>
          <div class="m-auto flex flex-col items-center gap-4">
            <DatePicker type="date" value="2025-09-24" />
            <div class="text-hint">Нет текущих записей</div>
            <Button onClick={() => setCollectionScreenIsOpen(true)}>
              Начать новую запись
            </Button>
          </div>
        </Match>
      </Switch>
      <PaycheckCollection
        isOpen={collectionScreenIsOpen()}
        onClose={() => setCollectionScreenIsOpen(false)}
      />
    </div>
  )
}

export default PaycheckList
