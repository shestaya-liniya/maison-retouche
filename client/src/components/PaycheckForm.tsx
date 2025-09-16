import { ApiPaycheckUI } from '@server/api/paycheck/type'

import Form, { FormField, FormValues } from '@/components/ui/Form'

export type PaycheckFormData = Omit<
  ApiPaycheckUI,
  'id' | 'vendorId' | 'createdAt' | 'updatedAt'
>

type OwnProps = {
  triggerRef: HTMLDivElement
  handleSubmit: (data: PaycheckFormData) => void
}

const PaycheckForm = (props: OwnProps) => {
  const fields: Record<keyof PaycheckFormData, FormField> = {
    serviceName: {
      placeholder: 'Название услуги'
    },
    price: {
      placeholder: 'Сумма',
      inputAttrs: { type: 'number' }
    },
    payDate: {
      placeholder: 'День / Месяц / Год',
      inputAttrs: { type: 'date' }
    },
    phoneNumber: {
      placeholder: 'Номер телефона клиента',
      inputAttrs: { type: 'tel' }
    }
  }

  const handleSubmit = (
    values: FormValues<Record<keyof PaycheckFormData, FormField>>
  ) => {
    props.handleSubmit({
      ...values,
      price: Number(values.price)
    })
  }

  return (
    <Form
      fields={fields}
      submitTriggerRef={props.triggerRef}
      onSubmit={handleSubmit}
    />
  )
}

export default PaycheckForm
