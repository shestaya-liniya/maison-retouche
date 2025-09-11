import { Match, onMount, Switch } from 'solid-js'

import Button from '@/components/ui/Button'
import { getGlobal } from '@/global'
import { getActions } from '@/global/actions'

const Edit = () => {
  const global = getGlobal()
  const { loadUnfinishedPaychecks } = getActions()

  onMount(() => {
    loadUnfinishedPaychecks()
  })

  return (
    <div class="h-full flex flex-col">
      <Switch>
        <Match when={global.unfinishedPaychecks.length === 0}>
          <div class="m-auto flex flex-col items-center gap-4">
            <div class="text-hint">Нет текущих записей</div>
            <Button>Начать новую запись</Button>
          </div>
        </Match>
      </Switch>
    </div>
  )
}

export default Edit
