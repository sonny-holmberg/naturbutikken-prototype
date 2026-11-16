import clsx from 'clsx'
import { Binoculars, ChevronLeft, ChevronRight } from 'lucide-react'
import { products } from '../data/products'
import { categories, categoryById, subToCategory } from '../data/taxonomy'
import { useStore } from '../lib/store'

const countIn = (pred: (sub: string) => boolean) => products.filter((p) => pred(p.sub)).length

/** "Produkter" browsing nav with drill-down into the IA. `onNavigate` lets the mobile sheet close itself. */
export function CategoryNav({ onNavigate }: { onNavigate?: () => void }) {
  const { state, setCategory } = useStore()
  const go = (cat?: string, sub?: string, done = true) => {
    setCategory(cat, sub)
    if (done) onNavigate?.()
  }
  const cat = categoryById(state.cat)

  if (!cat) {
    return (
      <nav aria-label="Produktkategorier" key="root" className="animate-fade-up">
        <h2 className="flex items-center gap-2 px-1 pb-3 font-display text-[22px] font-medium">
          <Binoculars className="size-5" strokeWidth={1.6} aria-hidden />
          Produkter
        </h2>
        <ul>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => go(c.id, undefined, false)}
                className="flex min-h-11 w-full items-center justify-between rounded-lg px-1 text-left font-medium transition hover:bg-section hover:pl-2"
              >
                {c.label}
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav aria-label={`Kategorier i ${cat.label}`} key={cat.id} className="animate-fade-up">
      <button
        type="button"
        onClick={() => go(undefined, undefined, false)}
        className="-ml-1 flex min-h-9 items-center gap-1 rounded-lg px-1 text-sm text-muted transition hover:text-primary"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Alle produkter
      </button>
      <h2 className="px-1 pt-1 pb-2 font-display text-[22px] font-medium">{cat.label}</h2>
      <ul>
        <li>
          <NavItem
            label={`Alle ${cat.label.toLowerCase()}`}
            count={countIn((s) => subToCategory[s] === cat.id)}
            current={!state.sub}
            onClick={() => go(cat.id)}
          />
        </li>
      </ul>
      {cat.groups.map((g) => (
        <div key={g.label} className="mt-3">
          <h3 className="px-1 pb-1 text-xs font-bold tracking-wide text-muted uppercase">{g.label}</h3>
          <ul>
            {g.items.map((s) => (
              <li key={s.id}>
                <NavItem
                  label={s.label}
                  count={countIn((x) => x === s.id)}
                  current={state.sub === s.id}
                  onClick={() => go(cat.id, s.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function NavItem({ label, count, current, onClick }: { label: string; count: number; current: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={current ? 'page' : undefined}
      className={clsx(
        'relative flex min-h-10 w-full items-center justify-between rounded-lg px-3 text-left text-[15px] transition',
        current ? 'bg-panel font-medium text-primary' : 'hover:bg-section',
      )}
    >
      {current && <span className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-primary" aria-hidden />}
      {label}
      <span className="text-xs text-muted tabular-nums">{count}</span>
    </button>
  )
}
