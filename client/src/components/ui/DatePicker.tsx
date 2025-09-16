import { createSignal } from 'solid-js'
import { twMerge } from 'tailwind-merge'

import CalendarIcon from '@/assets/icons/calendar.svg'
import Tappable from '@/components/ui/Tappable'

type OwnProps = {
  type: 'month' | 'date'
  value?: string
  onInput?: (value: string) => void
  isRounded?: boolean
}

const DatePicker = (props: OwnProps) => {
  const [value, setValue] = createSignal<string | undefined>(undefined)
  const [inputValue, setInputValue] = createSignal(props.value)

  const [isFocused, setIsFocused] = createSignal(false)

  let inputRef: HTMLInputElement | undefined

  const handleClick = () => {
    if (!isFocused()) {
      inputRef?.showPicker?.()
    } else {
      inputRef?.blur?.()
    }
  }

  const formatDate = (isoValue: string) => {
    if (!isoValue) return ''
    const [year, month, day] = isoValue.split('-')

    if (day) {
      return `${day}/${month}`
    }
    return `${month}/${year}`
  }

  const handleChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement
    setInputValue(target.value)
    setValue(formatDate(target.value))
    props.onInput?.(target.value)
  }

  const getPlaceholder = () => {
    if (props.type === 'date') {
      return 'Выбрать день'
    } else if (props.type === 'month') {
      return 'Выбрать год и месяц'
    }
  }

  const buttonClassName = twMerge(
    'flex justify-center items-center gap-2 bg-accent/10 p-4  text-accent',
    props.isRounded && 'rounded-lg'
  )

  return (
    <div class="relative">
      <input
        ref={inputRef}
        type={props.type}
        value={inputValue()}
        onInput={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        class="w-full h-full"
        style={{
          position: 'absolute',
          opacity: 0,
          width: '0',
          height: '0'
        }}
      />
      <Tappable onClick={handleClick} class={buttonClassName}>
        <CalendarIcon class="h-6 w-6" />
        <div class="font-medium">{value() || getPlaceholder()}</div>
      </Tappable>
    </div>
  )
}

export default DatePicker
