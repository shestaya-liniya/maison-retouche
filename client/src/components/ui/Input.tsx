import { JSX } from 'solid-js/jsx-runtime'

type OwnProps = {
  onInput: (value: string) => void
  placeholder: string
  value?: string
  inputAttrs?: JSX.InputHTMLAttributes<HTMLInputElement>
  currency?: string
}

const Input = (props: OwnProps) => {
  return (
    <div class="flex items-center bg-foreground px-4">
      <input
        value={props.value}
        onInput={e => props.onInput(e.currentTarget.value)}
        class="py-4 outline-none border-transparent flex-1"
        placeholder={props.placeholder}
        {...props.inputAttrs}
      />
      <span class="text-hint">{props.currency}</span>
    </div>
  )
}

export default Input
