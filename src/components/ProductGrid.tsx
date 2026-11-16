import clsx from 'clsx'
import { SearchX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Product } from '../data/products'
import { useStore } from '../lib/store'
import { ProductCard } from './ProductCard'

const PAGE = 9

export function ProductGrid({ results }: { results: Product[] }) {
  const { state, clearAll } = useStore()
  const [shown, setShown] = useState(PAGE)
  const [loading, setLoading] = useState(false)
  const firstNew = useRef<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Move keyboard focus to the first newly loaded product so screen reader / keyboard users keep their place.
  useEffect(() => {
    if (firstNew.current === null || loading) return
    const el = listRef.current?.children[firstNew.current]?.querySelector<HTMLElement>('button, a')
    el?.focus({ preventScroll: true })
    firstNew.current = null
  }, [shown, loading])

  if (!results.length) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-card px-6 py-16 text-center">
        <SearchX className="size-10 text-[#a8b4be]" strokeWidth={1.4} aria-hidden />
        <h2 className="mt-4 font-display text-xl font-medium">Ingen produkter matcher dine filtre</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">Prøv at fjerne et eller flere filtre, eller vælg en anden kategori.</p>
        <button type="button" onClick={clearAll} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark">
          Ryd alle filtre
        </button>
      </div>
    )
  }

  const visible = results.slice(0, shown)
  const remaining = results.length - shown
  const loadMore = () => {
    setLoading(true)
    firstNew.current = shown
    // Simulated network delay, so the progressive loading pattern can be tested.
    setTimeout(() => {
      setShown((s) => s + PAGE)
      setLoading(false)
    }, 650)
  }

  const grid = state.view === 'grid'
  return (
    <>
      <div
        ref={listRef}
        className={clsx(
          grid
            ? 'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 max-md:[&>*:last-child:nth-child(odd)]:col-span-2'
            : 'flex flex-col gap-3',
        )}
      >
        {visible.map((p, i) => (
          <div key={p.id} className={i >= shown - PAGE && shown > PAGE ? 'animate-fade-up' : undefined}>
            <ProductCard p={p} view={state.view} />
          </div>
        ))}
        {loading && Array.from({ length: Math.min(PAGE, remaining) }, (_, i) => <Skeleton key={i} grid={grid} />)}
      </div>

      {remaining > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="group flex min-h-11 items-baseline gap-2 rounded-full px-5 text-ink transition hover:bg-section disabled:opacity-60"
          >
            <span className="font-medium group-hover:text-primary">{loading ? 'Henter produkter…' : 'Vis flere produkter'}</span>
            <span className="text-xs text-muted">({remaining} produkter mere)</span>
          </button>
        </div>
      )}
    </>
  )
}

function Skeleton({ grid }: { grid: boolean }) {
  return grid ? (
    <div className="rounded-2xl bg-card p-1.5" aria-hidden>
      <div className="skeleton aspect-[1.02] rounded-xl" />
      <div className="space-y-2 px-3 py-4 sm:px-5">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton mt-4 h-9 w-full rounded-full" />
      </div>
    </div>
  ) : (
    <div className="flex gap-6 rounded-2xl bg-card p-1.5" aria-hidden>
      <div className="skeleton aspect-square w-32 rounded-xl sm:w-52" />
      <div className="flex-1 space-y-2 py-6">
        <div className="skeleton h-3 w-1/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  )
}
