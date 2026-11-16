import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'
import { ArrowDownUp, Check, ChevronDown, LayoutGrid, Rows3 } from 'lucide-react'
import { sortOptions, type SortKey } from '../lib/filters'
import { useStore } from '../lib/store'

export function ViewToggle() {
  const { state, setView } = useStore()
  const items = [
    { value: 'grid', label: 'Galleri', Icon: LayoutGrid },
    { value: 'list', label: 'Liste', Icon: Rows3 },
  ] as const
  return (
    <div role="group" aria-label="Visning" className="inline-flex rounded-lg bg-panel p-0.5">
      {items.map(({ value, label, Icon }) => {
        const on = state.view === value
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
            onClick={() => setView(value)}
            className={clsx(
              'flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs transition sm:text-[13px]',
              on ? 'bg-white text-primary shadow-sm' : 'text-ink hover:text-primary',
            )}
          >
            <Icon className="size-4" strokeWidth={1.6} aria-hidden />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export function ResultCount({ count }: { count: number }) {
  return (
    <p className="text-sm text-ink" aria-live="polite" aria-atomic>
      {count} {count === 1 ? 'produkt' : 'produkter'} fundet
    </p>
  )
}

export function SortSelect() {
  const { state, setSort } = useStore()
  return (
    <div className="flex items-center gap-2">
      <ArrowDownUp className="size-4" strokeWidth={1.6} aria-hidden />
      <span id="sort-label" className="text-[13px]">Sortér efter:</span>
      <Select.Root value={state.sort} onValueChange={(v) => setSort(v as SortKey)}>
        <Select.Trigger
          aria-labelledby="sort-label"
          className="flex h-9 min-w-40 items-center justify-between gap-2 rounded-md border border-[#8e8e93] bg-white px-3 text-[13px] font-medium transition hover:border-primary data-[state=open]:border-primary"
        >
          <Select.Value />
          <Select.Icon><ChevronDown className="size-4" aria-hidden /></Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" sideOffset={4} align="end" className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-line bg-white p-1 shadow-lg">
            <Select.Viewport>
              {sortOptions.map((o) => (
                <Select.Item
                  key={o.value}
                  value={o.value}
                  className="relative flex h-9 cursor-pointer items-center rounded-md pr-3 pl-8 text-[13px] outline-none select-none data-[highlighted]:bg-panel data-[state=checked]:font-medium data-[state=checked]:text-primary"
                >
                  <Select.ItemIndicator className="absolute left-2"><Check className="size-4" /></Select.ItemIndicator>
                  <Select.ItemText>{o.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
