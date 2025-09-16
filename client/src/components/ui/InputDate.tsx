import { JSX } from 'solid-js/jsx-runtime'

type OwnProps = {
  onInput: (value: string) => void
  placeholder: string
  value?: string
  attrs?: JSX.InputHTMLAttributes<HTMLInputElement>
}

const InputDate = (props: OwnProps) => {
  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, '')

    if (digits.length <= 1) {
      return digits
    } else if (digits.length === 2) {
      return `${digits.slice(0, 2)}/`
    } else if (digits.length === 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`
    } else if (digits.length === 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}/`
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`
    }
  }

  const handleInput = (newValue: string) => {
    if (newValue.length > 10) {
      props.onInput(newValue.slice(0, -2))
    }

    const formatted = formatDate(newValue)
    props.onInput(formatted)
  }

  return (
    <div class="flex bg-foreground px-4">
      <input
        value={props.value}
        onInput={e => {
          handleInput(e.currentTarget.value)
        }}
        class="py-4 outline-none border-transparent flex-1"
        placeholder={props.placeholder}
        {...props.attrs}
        type="text"
        inputMode="numeric"
      />
    </div>
  )
}

export default InputDate
