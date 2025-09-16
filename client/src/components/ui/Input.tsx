import { JSX } from 'solid-js/jsx-runtime'

type OwnProps = {
  value: string
  onInput: (value: string) => void
  placeholder: string
  attrs?: JSX.InputHTMLAttributes<HTMLInputElement>
}

const Input = (props: OwnProps) => {
  return (
    <div class="flex bg-foreground px-4">
      <input
        value={props.value}
        onInput={e => props.onInput(e.currentTarget.value)}
        class="py-4 outline-none border-transparent flex-1"
        placeholder={props.placeholder}
        {...props.attrs}
      />
    </div>
  )
}

export default Input
