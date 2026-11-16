import { Fragment } from 'react'
import { categoryById, SECTION_LABEL, subcategoryById } from '../data/taxonomy'
import { useStore } from '../lib/store'

export function Breadcrumb() {
  const { state, setCategory } = useStore()
  const cat = categoryById(state.cat)
  const sub = subcategoryById(state.sub)

  const crumbs: { label: string; onClick?: () => void }[] = [{ label: SECTION_LABEL, onClick: () => setCategory() }]
  if (cat) crumbs.push({ label: cat.label, onClick: () => setCategory(cat.id) })
  if (sub) crumbs.push({ label: sub.label })
  const last = crumbs.length - 1

  return (
    <nav aria-label="Brødkrumme" className="text-xs text-ink">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => (
          <Fragment key={c.label}>
            {i > 0 && <li aria-hidden className="text-muted">/</li>}
            <li>
              {i === last ? (
                <span aria-current="page" className="font-medium">{c.label}</span>
              ) : (
                <button type="button" onClick={c.onClick} className="text-muted underline-offset-2 hover:text-primary hover:underline">
                  {c.label}
                </button>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
