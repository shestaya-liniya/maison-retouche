import { ApiPaycheckUI } from '@server/api/paycheck/type'

const PaycheckPreview = (props: ApiPaycheckUI) => {
  return (
    <div class="flex justify-between bg-foreground px-4 py-2">
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
    </div>
  )
}

export default PaycheckPreview
