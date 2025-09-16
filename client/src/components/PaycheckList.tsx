import { createMemo, createSignal, Match, onMount, Switch } from 'solid-js'

import PaycheckCollection from '@/components/screens/PaycheckCollection'
import Button from '@/components/ui/Button'
import ModalInput from '@/components/ui/modals/ModalInputDate'
import { getGlobal } from '@/global'
import { getActions } from '@/global/actions'

const PaycheckList = () => {
  const global = getGlobal()
  const paychecksState = createMemo(() => global.paychecks)
  const { loadUnfinishedPaychecks, setCollectionDate } = getActions()

  const [collectionDateModalIsOpen, setCollectionDateModalIsOpen] =
    createSignal(false)

  const [collectionScreenIsOpen, setCollectionScreenIsOpen] =
    createSignal(false)

  onMount(() => {
    loadUnfinishedPaychecks()
  })

  const handleCreateNewCollection = (collectionDate: string) => {
    const [year, month] = collectionDate.split('-')
    setCollectionDate({
      year: Number(year),
      month: Number(month)
    })
    setCollectionScreenIsOpen(true)
  }

  return (
    <div class="h-full flex flex-col">
      <Switch>
        <Match when={paychecksState().fromLocalStorage.length === 0}>
          <div class="m-auto flex flex-col items-center gap-4">
            <div class="text-hint">Нет текущих записей</div>
            <Button onClick={() => setCollectionDateModalIsOpen(true)}>
              Начать новую запись
            </Button>
          </div>
        </Match>
      </Switch>
      <PaycheckCollection
        isOpen={collectionScreenIsOpen()}
        onClose={() => setCollectionScreenIsOpen(false)}
      />
      <ModalInput
        isOpen={collectionDateModalIsOpen()}
        onClose={() => setCollectionDateModalIsOpen(false)}
        title="Выбор даты"
        description="Месяц и год заполняемой книжки"
        visibleBackdrop
        onSubmit={handleCreateNewCollection}
      ></ModalInput>
    </div>
  )
}

export default PaycheckList
