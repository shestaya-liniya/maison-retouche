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
  values?: PaycheckFormData
}

const PaycheckForm = (props: OwnProps) => {
  const fields: Record<keyof PaycheckFormData, FormField> = {
    serviceName: {
      placeholder: 'Название услуги',
      value: props.values?.serviceName
    },
    price: {
      placeholder: 'Сумма',
      inputAttrs: { type: 'number' },
      currency: '€',
      value: props.values?.price.toString()
    },
    phoneNumber: {
      placeholder: 'Номер телефона клиента',
      inputAttrs: { type: 'tel' },
      validator: {
        handle: value => {
          return regexp.FRENCH_TEL.test(value)
        },
        message: 'Неправильный номер телефона'
      },
      value: props.values?.phoneNumber
    },
    payDate: {
      placeholder: 'День / Месяц / Год',
      inputAttrs: { type: 'date' },
      value: props.values?.payDate.toString()
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
