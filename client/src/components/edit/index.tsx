import { createMemo, createSignal, Match, onMount, Switch } from 'solid-js'

import PaycheckCollection from '@/components/edit/paycheckCollection'
import Button from '@/components/ui/Button'
import { getGlobal } from '@/global'
import { getActions } from '@/global/actions'

const Edit = () => {
  const global = getGlobal()
  const paychecksState = createMemo(() => global.paychecks)
  const { loadUnfinishedPaychecks } = getActions()

  const [newMonthlyEntryIsOpen, setNewMonthlyEntryIsOpen] = createSignal(false)

  onMount(() => {
    loadUnfinishedPaychecks()
  })

  return (
    <div class="h-full flex flex-col">
      <Switch>
        <Match when={paychecksState().fromLocalStorage.length === 0}>
          <div class="m-auto flex flex-col items-center gap-4">
            <div class="text-hint">Нет текущих записей</div>
            <Button onClick={() => setNewMonthlyEntryIsOpen(true)}>
              Начать новую запись
            </Button>
          </div>
        </Match>
      </Switch>
      <PaycheckCollection
        isOpen={newMonthlyEntryIsOpen()}
        onClose={() => setNewMonthlyEntryIsOpen(false)}
      />
    </div>
  )
}

export default Edit
