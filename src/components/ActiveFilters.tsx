import { X } from 'lucide-react'
import { brandLabel, facetByKey, type FacetKey, type ListKey } from '../lib/filters'
import { formatRangeValue } from '../lib/format'
import { useStore } from '../lib/store'

const listKeys: ListKey[] = ['brand', 'mag', 'obj', 'use', 'feat', 'avail']

/** Removable chips for every active filter, shown above the results. */
export function ActiveFilters() {
  const { state, toggle, setRange, clearAll } = useStore()

  const chips: { key: string; label: string; remove: () => void }[] = []
  for (const k of listKeys) {
    const f = facetByKey[k]
    if (f.kind === 'range') continue
    const opts = f.options([])
    for (const v of state[k]) {
      const label = k === 'brand' ? brandLabel(v) : opts.find((o) => o.value === v)?.label ?? v
      chips.push({ key: `${k}-${v}`, label, remove: () => toggle(k, v) })
    }
  }
  for (const k of ['price', 'weight'] as const) {
    const r = state[k]
    const f = facetByKey[k as FacetKey]
    if (r && f.kind === 'range') {
      chips.push({
        key: k,
        label: `${f.label}: ${formatRangeValue(r[0], f.unit)} – ${formatRangeValue(r[1], f.unit)}`,
        remove: () => setRange(k),
      })
    }
  }

  if (!chips.length) return null
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Aktive filtre" role="group">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.remove}
          aria-label={`Fjern filter ${c.label}`}
          className="animate-fade-up inline-flex h-8 items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft pr-2 pl-3 text-[13px] text-primary transition hover:border-primary"
        >
          {c.label}
          <X className="size-3.5" aria-hidden />
        </button>
      ))}
      <button type="button" onClick={clearAll} className="h-8 px-2 text-[13px] text-muted underline underline-offset-2 hover:text-primary">
        Ryd alle
      </button>
    </div>
  )
}
