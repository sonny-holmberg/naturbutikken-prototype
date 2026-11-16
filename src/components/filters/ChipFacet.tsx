import clsx from 'clsx'
import type { Option } from '../../lib/filters'

type Props = {
  name: string
  options: Option[]
  selected: string[]
  counts: Record<string, number>
  onToggle: (value: string) => void
}

export function ChipFacet({ name, options, selected, counts, onToggle }: Props) {
  return (
    <div role="group" aria-label={name} className="grid grid-cols-3 gap-2 px-3 pt-1 pb-4">
      {options.map((o) => {
        const on = selected.includes(o.value)
        const count = counts[o.value] ?? 0
        const disabled = !on && count === 0
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            disabled={disabled}
            title={`${count} produkter`}
            onClick={() => onToggle(o.value)}
            className={clsx(
              'h-11 rounded-md border px-1 text-[15px] transition',
              on
                ? 'border-primary bg-primary-soft font-medium text-primary'
                : 'border-[#8e8e93] bg-white text-ink hover:border-primary hover:text-primary',
              disabled && 'cursor-default border-line text-[#b5b5b8] hover:border-line hover:text-[#b5b5b8]',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
