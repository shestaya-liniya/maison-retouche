import { ApiPaycheckUI } from '@server/api/paycheck/type'

import Form, { FormField, FormValues } from '@/components/ui/Form'
import { regexp } from '@/lib/common/const/regexp'

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
      inputAttrs: { type: 'number' },
      currency: '€'
    },
    phoneNumber: {
      placeholder: 'Номер телефона клиента',
      inputAttrs: { type: 'tel' },
      validator: {
        handle: value => {
          return regexp.FRENCH_TEL.test(value)
        },
        message: 'Неправильный номер телефона'
      }
    },
    payDate: {
      placeholder: 'День / Месяц / Год',
      inputAttrs: { type: 'date' }
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
