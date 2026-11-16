import clsx from 'clsx'
import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Option } from '../../lib/filters'
import { asset } from '../../lib/format'

type Props = {
  name: string
  options: Option[]
  selected: string[]
  counts: Record<string, number>
  onToggle: (value: string) => void
  /** Show only this many options until "Vis alle" is pressed */
  limit?: number
}

export function CheckboxFacet({ name, options, selected, counts, onToggle, limit }: Props) {
  const [expanded, setExpanded] = useState(false)
  const hiddenSelected = limit !== undefined && options.slice(limit).some((o) => selected.includes(o.value))
  const collapsed = limit !== undefined && options.length > limit && !expanded && !hiddenSelected
  const shown = collapsed ? options.slice(0, limit) : options
  return (
    <fieldset className="pb-2">
      <legend className="sr-only">{name}</legend>
      {shown.map((o) => {
        const checked = selected.includes(o.value)
        const count = counts[o.value] ?? 0
        const disabled = !checked && count === 0
        return (
          <label
            key={o.value}
            className={clsx(
              'flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-[15px] transition hover:bg-white',
              disabled && 'cursor-default opacity-40 hover:bg-transparent',
            )}
          >
            <span className="flex-1">{o.label}</span>
            {o.logo && (
              <img src={asset(`img/brands/${o.logo}.webp`)} alt="" className="h-5 max-w-20 object-contain" />
            )}
            <span className="w-6 text-right text-xs text-muted tabular-nums" aria-label={`${count} produkter`}>
              {count}
            </span>
            <span className="relative grid size-5 place-items-center">
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => onToggle(o.value)}
                className="peer size-5 cursor-pointer appearance-none rounded-[5px] border-[1.5px] border-[#3c3c3e] bg-white transition checked:border-primary checked:bg-primary disabled:cursor-default"
              />
              <Check className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
            </span>
          </label>
        )
      })}
      {limit !== undefined && options.length > limit && !hiddenSelected && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-1 flex min-h-10 items-center gap-1 px-3 text-sm text-primary hover:underline"
        >
          {expanded ? 'Vis færre' : `Vis alle ${name.toLowerCase()} (${options.length})`}
          <ChevronDown className={clsx('size-4 transition', expanded && 'rotate-180')} aria-hidden />
        </button>
      )}
    </fieldset>
  )
}
