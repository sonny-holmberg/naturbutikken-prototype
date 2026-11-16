import clsx from 'clsx'
import { ArrowDownUp, Binoculars, Check, SlidersHorizontal, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Drawer } from 'vaul'
import { categoryById, subcategoryById } from '../data/taxonomy'
import { activeFilterCount, sortOptions } from '../lib/filters'
import { useStore } from '../lib/store'
import { CategoryNav } from './CategoryNav'
import { FilterSections } from './FilterPanel'

type SheetName = 'kategorier' | 'filtrering' | 'sortering' | null

/** Mobile/tablet: Kategorier · Filtrering · Sortering buttons that open bottom sheets. */
export function MobileBar({ resultCount }: { resultCount: number }) {
  const { state, setSort, clearAll } = useStore()
  const [open, setOpen] = useState<SheetName>(null)
  const nFilters = activeFilterCount(state)
  const where = subcategoryById(state.sub)?.label ?? categoryById(state.cat)?.label

  const btn = 'flex h-12 items-center gap-3 rounded-xl border border-[#8e8e93] bg-white px-4 text-[17px] transition active:bg-section'

  return (
    <>
      <div className="sticky top-0 z-30 -mx-4 bg-white/95 px-4 pt-2 pb-2 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <button type="button" className={clsx(btn, 'col-span-2')} onClick={() => setOpen('kategorier')}>
            <Binoculars className="size-5" strokeWidth={1.6} aria-hidden />
            Kategorier
            {where && <span className="ml-auto truncate text-sm text-primary">{where}</span>}
          </button>
          <button type="button" className={btn} onClick={() => setOpen('filtrering')}>
            <SlidersHorizontal className="size-5" strokeWidth={1.6} aria-hidden />
            Filtrering
            {nFilters > 0 && (
              <span className="ml-auto grid h-6 min-w-6 place-items-center rounded-full bg-primary px-1.5 text-xs font-medium text-white">
                <span className="sr-only">aktive filtre: </span>{nFilters}
              </span>
            )}
          </button>
          <button type="button" className={btn} onClick={() => setOpen('sortering')}>
            <ArrowDownUp className="size-5" strokeWidth={1.6} aria-hidden />
            Sortering
          </button>
        </div>
      </div>

      <Sheet title="Kategorier" open={open === 'kategorier'} onClose={() => setOpen(null)}>
        <div className="px-4 pb-8">
          <CategoryNav onNavigate={() => setOpen(null)} />
        </div>
      </Sheet>

      <Sheet
        title="Filtrering"
        open={open === 'filtrering'}
        onClose={() => setOpen(null)}
        action={
          <button type="button" onClick={clearAll} disabled={!nFilters} className="rounded-md border border-[#8e8e93] px-3 py-1 text-xs disabled:opacity-40">
            Ryd alle
          </button>
        }
        footer={
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="h-12 w-full rounded-full bg-primary text-[16px] font-medium text-white active:bg-primary-dark"
          >
            Vis {resultCount} {resultCount === 1 ? 'produkt' : 'produkter'}
          </button>
        }
      >
        <div className="bg-panel p-1">
          <FilterSections />
        </div>
      </Sheet>

      <Sheet title="Sortering" open={open === 'sortering'} onClose={() => setOpen(null)}>
        <div role="radiogroup" aria-label="Sortér efter" className="px-2 pb-8">
          {sortOptions.map((o) => {
            const on = state.sort === o.value
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => { setSort(o.value); setOpen(null) }}
                className={clsx('flex h-12 w-full items-center justify-between rounded-lg px-3 text-left text-[16px]', on && 'bg-panel font-medium text-primary')}
              >
                {o.label}
                {on && <Check className="size-5" aria-hidden />}
              </button>
            )
          })}
        </div>
      </Sheet>
    </>
  )
}

function Sheet({ title, open, onClose, action, footer, children }: {
  title: string
  open: boolean
  onClose: () => void
  action?: ReactNode
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <Drawer.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl bg-white outline-none">
          <div className="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-[#d0d4d8]" aria-hidden />
          <div className="flex shrink-0 items-center gap-3 px-4 pt-3 pb-3">
            <Drawer.Title className="flex-1 font-display text-[22px] font-medium">{title}</Drawer.Title>
            {action}
            <Drawer.Close className="grid size-10 place-items-center rounded-full hover:bg-section" aria-label="Luk">
              <X className="size-5" />
            </Drawer.Close>
          </div>
          <Drawer.Description className="sr-only">{title}</Drawer.Description>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          {footer && <div className="shrink-0 border-t border-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{footer}</div>}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
