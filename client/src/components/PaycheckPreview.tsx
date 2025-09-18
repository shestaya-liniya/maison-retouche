import { ApiPaycheckUI } from '@server/api/paycheck/type'

import PaycheckCollectionEdit from '@/components/screens/PaycheckCollectionEdit'
import Tappable from '@/components/ui/Tappable'
import { getActions } from '@/global/actions'

const PaycheckPreview = (props: ApiPaycheckUI) => {
  const { setCollectionPaycheckInEdit, setPaycheckCollectionEditIsOpen } =
    getActions()

  const handleClick = () => {
    setCollectionPaycheckInEdit(props)
    setPaycheckCollectionEditIsOpen(true)
  }

  return (
    <>
      <Tappable
        onClick={handleClick}
        class="flex justify-between bg-foreground px-4 py-2"
      >
        <div>
          <div>{props.serviceName}</div>
          <div class="flex text-hint text-xs">
            <span>
              Дата: <span>{props.payDate as string}</span>
            </span>
          </div>
          <div class="flex text-hint text-xs">
            <span>
              Телефон клиента: <span>{props.phoneNumber}</span>
            </span>
          </div>
        </div>
        <div>{props.price}€</div>
      </Tappable>
      <PaycheckCollectionEdit />
    </>
  )
}

export default PaycheckPreview
