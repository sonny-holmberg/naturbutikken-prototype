import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { useMemo } from 'react'
import { products } from '../data/products'
import { applyFilters, facets, inScope, optionCounts, type FacetDef } from '../lib/filters'
import { useStore } from '../lib/store'
import { CheckboxFacet } from './filters/CheckboxFacet'
import { ChipFacet } from './filters/ChipFacet'
import { RangeFacet } from './filters/RangeFacet'

const DEFAULT_OPEN = ['brand', 'price', 'mag']

function isActive(f: FacetDef, s: ReturnType<typeof useStore>['state']) {
  return f.kind === 'range' ? !!s[f.key] : s[f.key].length > 0
}

/** The filter sections. Used inside the desktop sidebar and the mobile sheet. */
export function FilterSections() {
  const { state, toggle, setRange, clearFacet } = useStore()
  const scope = useMemo(() => products.filter((p) => inScope(p, state)), [state])

  // Only show sections that are relevant for the products in the current category.
  const visible = facets.filter((f) => {
    const relevant = scope.filter(f.has)
    if (f.kind === 'range') return new Set(relevant.map(f.get)).size > 1
    return relevant.length > 0
  })

  return (
    <Accordion.Root type="multiple" defaultValue={DEFAULT_OPEN} className="flex flex-col gap-1">
      {visible.map((f) => {
        const active = isActive(f, state)
        return (
          <Accordion.Item key={f.key} value={f.key} className="rounded-xl bg-section">
            <Accordion.Header className="relative flex">
              <Accordion.Trigger className="group flex min-h-12 flex-1 items-center justify-between rounded-xl px-3 text-left text-[16px] font-medium text-ink">
                <span className="flex items-center gap-2">
                  {f.label}
                  {active && f.kind !== 'range' && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-medium text-white">
                      {state[f.key].length}
                    </span>
                  )}
                  {active && f.kind === 'range' && <span className="size-2 rounded-full bg-primary" aria-label="aktivt filter" />}
                </span>
                <ChevronDown className="size-5 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
              </Accordion.Trigger>
              {active && (
                <button
                  type="button"
                  onClick={() => clearFacet(f.key)}
                  className="absolute top-1/2 right-11 -translate-y-1/2 rounded-md border border-[#8e8e93] bg-white px-2.5 py-1 text-xs text-ink transition hover:border-primary hover:text-primary"
                >
                  Ryd filter
                </button>
              )}
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
              {f.kind === 'range' ? (
                <RangeFacet
                  name={f.label}
                  unit={f.unit}
                  placeholder={f.placeholder}
                  scopeValues={scope.map(f.get)}
                  baseValues={applyFilters(products, state, f.key).map(f.get)}
                  value={state[f.key]}
                  onChange={(r) => setRange(f.key, r)}
                />
              ) : (
                (() => {
                  const Comp = f.kind === 'chips' ? ChipFacet : CheckboxFacet
                  return (
                    <Comp
                      name={f.label}
                      options={f.options(scope)}
                      selected={state[f.key]}
                      counts={optionCounts(products, state, f)}
                      onToggle={(v) => toggle(f.key, v)}
                      limit={f.key === 'brand' ? 7 : undefined}
                    />
                  )
                })()
              )}
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}

export function FilterPanel({ className }: { className?: string }) {
  const { state, clearAll } = useStore()
  const anyActive = facets.some((f) => isActive(f, state))
  return (
    <section aria-labelledby="filter-heading" className={clsx('rounded-2xl bg-panel p-1', className)}>
      <div className="flex items-center justify-between px-3 py-3">
        <h2 id="filter-heading" className="flex items-center gap-2 font-display text-[22px] font-medium">
          <SlidersHorizontal className="size-5" strokeWidth={1.6} aria-hidden />
          Filtrering
        </h2>
        <button
          type="button"
          onClick={clearAll}
          disabled={!anyActive}
          className="rounded-md border border-[#8e8e93] bg-white px-3 py-1 text-xs transition enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-40"
        >
          Ryd alle
        </button>
      </div>
      <FilterSections />
    </section>
  )
}
