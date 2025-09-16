import { For, Show } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { createStore } from 'solid-js/store'

import DatePicker from '@/components/ui/DatePicker'
import Input from '@/components/ui/Input'

export type FormField = {
  placeholder: string
  name?: string
  value?: string
  inputAttrs?: JSX.InputHTMLAttributes<HTMLInputElement>
  isOptional?: boolean
  errorMessage?: string
  currency?: string
  validator?: {
    handle: (value: string) => boolean
    message?: string
  }
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
  const fieldsArray: FormField[] = Object.entries(props.fields).map(
    ([key, field]) => ({
      name: key,
      value: field.value ?? '',
      errorMessage: '',
      ...field
    })
  )

  const [formData, setFormData] = createStore(fieldsArray)

  const handleChange = (fieldName: string, newValue: string) => {
    setFormData(field => field.name === fieldName, 'value', newValue)
  }

  const handleClear = () => {
    setFormData({}, 'value', '')
  }

  const setFieldError = (fieldName: string, error: string) => {
    setFormData(f => f.name === fieldName, 'errorMessage', error)
  }

  const hasFieldError = () => {
    setFormData(() => true, 'errorMessage', undefined)

    formData.forEach(field => {
      if (!field.name) return

      if (field.validator && field.value) {
        const isValid = field.validator?.handle(field.value)

        if (!isValid) {
          setFieldError(field.name, field.validator?.message ?? 'Ошибка')
        }
      }

      if (!field.isOptional && field.value?.length === 0) {
        setFormData(
          f => f.name === field.name,
          'errorMessage',
          'Обязательное поле'
        )
      }
    })

    return formData.some(
      field => field.errorMessage && field.errorMessage.length > 0
    )
  }

  props.submitTriggerRef.onclick = () => {
    if (hasFieldError()) return

    const values = {} as FormValues<T>

    formData.forEach(field => {
      if (field.name) {
        values[field.name as keyof T] = field.value ?? ''
      }
    })

    props.onSubmit(values)
    handleClear()
  }

  const isDateLike = (type: unknown): type is 'date' | 'month' =>
    type === 'date' || type === 'month'

  const renderInput = (field: FormField) => {
    const { type } = field.inputAttrs ?? {}

    if (isDateLike(type)) {
      return (
        <DatePicker
          type={type}
          value={field.value as string}
          onInput={value => handleChange(field.name!, value)}
        />
      )
    }

    return (
      <Input {...field} onInput={value => handleChange(field.name!, value)} />
    )
  }

  return (
    <div class="flex flex-col divide-y divide-background-secondary/50">
      <For each={formData}>
        {field => {
          return (
            <>
              {renderInput(field)}
              <Show when={field.errorMessage}>
                {errorMessage => (
                  <div class="px-4 py-2 text-destructive">{errorMessage()}</div>
                )}
              </Show>
            </>
          )
        }}
      </For>
    </div>
  )
}

export default Form
