import { For } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { createStore } from 'solid-js/store'

import Input from '@/components/ui/Input'
import InputDate from '@/components/ui/InputDate'

export type FormField = {
  placeholder: string
  name?: string
  value?: string
  inputAttrs?: JSX.InputHTMLAttributes<HTMLInputElement>
}

export type FormConfig<T extends Record<string, FormField>> = T
export type FormValues<T extends Record<string, FormField>> = Record<
  keyof T,
  string
>

type OwnProps<T extends Record<string, FormField>> = {
  fields: FormConfig<T>
  onSubmit: (values: FormValues<T>) => void
  submitTriggerRef: HTMLDivElement
}

const Form = <T extends Record<string, FormField>>(props: OwnProps<T>) => {
  const fieldsArray = Object.entries(props.fields).map(([key, field]) => ({
    ...field,
    name: key
  }))

  const [formData, setFormData] = createStore(fieldsArray)

  const handleChange = (fieldName: string, newValue: string) => {
    setFormData(field => field.name === fieldName, 'value', newValue)
  }

  const handleClear = () => {
    setFormData({}, 'value', '')
  }

  props.submitTriggerRef.onclick = () => {
    const values = {} as FormValues<T>

    formData.forEach(field => {
      if (field.name) {
        values[field.name as keyof T] = field.value ?? ''
      }
    })

    props.onSubmit(values)
    handleClear()
  }

  return (
    <div class="flex flex-col divide-y divide-background-secondary/50">
      <For each={formData}>
        {field => {
          if (field.inputAttrs?.type === 'date') {
            return (
              <InputDate
                placeholder={field.placeholder}
                attrs={field.inputAttrs}
                value={field.value ?? ''}
                onInput={value => handleChange(field.name!, value)}
              />
            )
          }
          return (
            <Input
              placeholder={field.placeholder}
              attrs={field.inputAttrs}
              value={field.value ?? ''}
              onInput={value => handleChange(field.name!, value)}
            />
          )
        }}
      </For>
    </div>
  )
}

export default Form
