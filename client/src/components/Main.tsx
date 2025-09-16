import { onMount } from 'solid-js'

import PaycheckList from '@/components/PaycheckList'
import { getActions } from '@/global/actions'

const Main = () => {
  const { fetchUser } = getActions()

  onMount(() => {
    fetchUser()
  })

  return (
    <>
      <PaycheckList />
    </>
  )
}

export default Main
