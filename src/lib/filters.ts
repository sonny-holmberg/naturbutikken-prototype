import { brands, brandById } from '../data/brands'
import type { Product } from '../data/products'
import { subToCategory } from '../data/taxonomy'

// ───────────────────────── State ─────────────────────────

export type SortKey = 'populaer' | 'nyeste' | 'pris-asc' | 'pris-desc' | 'navn'
export type ListKey = 'brand' | 'mag' | 'obj' | 'use' | 'feat' | 'avail'
export type RangeKey = 'price' | 'weight'
export type FacetKey = ListKey | RangeKey

export type FilterState = {
  cat?: string
  sub?: string
  brand: string[]
  mag: string[]
  obj: string[]
  use: string[]
  feat: string[]
  avail: string[]
  price?: [number, number]
  weight?: [number, number]
  sort: SortKey
  view: 'grid' | 'list'
}

export const emptyFilters = (): Pick<FilterState, ListKey | RangeKey> => ({
  brand: [], mag: [], obj: [], use: [], feat: [], avail: [], price: undefined, weight: undefined,
})

export const initialState: FilterState = { ...emptyFilters(), sort: 'populaer', view: 'grid' }

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'populaer', label: 'Popularitet' },
  { value: 'nyeste', label: 'Nyeste' },
  { value: 'pris-asc', label: 'Pris: lav til høj' },
  { value: 'pris-desc', label: 'Pris: høj til lav' },
  { value: 'navn', label: 'Navn: A-Å' },
]

// ───────────────────────── Facets ─────────────────────────

export type Option = { value: string; label: string; logo?: string }

type ListFacetDef = {
  kind: 'checkbox' | 'chips'
  key: ListKey
  label: string
  /** 'or' = match any selected option, 'and' = match all selected options */
  mode: 'or' | 'and'
  options: (scope: Product[]) => Option[]
  match: (p: Product, value: string) => boolean
  /** Whether a product carries this attribute at all (decides if the section is shown) */
  has: (p: Product) => boolean
}

type RangeFacetDef = {
  kind: 'range'
  key: RangeKey
  label: string
  unit: string
  placeholder: [string, string]
  get: (p: Product) => number
  has: (p: Product) => boolean
}

export type FacetDef = ListFacetDef | RangeFacetDef

const magBuckets = [8, 10, 12, 16, 20, 22]
const objBuckets: { value: string; label: string; min: number; max: number }[] = [
  { value: '21', label: '21mm', min: 0, max: 21 },
  { value: '25', label: '25mm', min: 22, max: 28 },
  { value: '32', label: '32mm', min: 29, max: 36 },
  { value: '42', label: '42mm', min: 37, max: 45 },
  { value: '50', label: '50mm', min: 46, max: 55 },
  { value: '56', label: '≥ 56mm', min: 56, max: Infinity },
]

export const useLabels: Record<string, string> = {
  fuglekig: 'Fuglekig', sport: 'Sport', vandring: 'Vandring', sejlads: 'Sejlads', astronomi: 'Astronomi', safari: 'Safari',
}
export const featureLabels: Record<string, string> = {
  vandtaet: 'Vandtæt', billedstabilisering: 'Billedstabilisering', stativgevind: 'Stativgevind',
  brillevenlig: 'Brillevenlig', 'ed-glas': 'ED-glas',
}
export const availabilityLabels: Record<string, string> = {
  lager: 'På lager', faa: 'Få på lager', fjernlager: 'Levering 3-5 dage',
}

export const facets: FacetDef[] = [
  {
    kind: 'checkbox', key: 'brand', label: 'Brands', mode: 'or',
    has: () => true,
    options: (scope) => {
      const inScope = new Set(scope.map((p) => p.brand))
      return brands.filter((b) => inScope.has(b.id)).map((b) => ({ value: b.id, label: b.label, logo: b.logo }))
    },
    match: (p, v) => p.brand === v,
  },
  {
    kind: 'range', key: 'price', label: 'Pris', unit: 'kr.', placeholder: ['Min. pris', 'Max. pris'],
    get: (p) => p.price, has: () => true,
  },
  {
    kind: 'chips', key: 'mag', label: 'Forstørrelse', mode: 'or',
    has: (p) => !!p.mag,
    options: () => magBuckets.map((m) => ({ value: String(m), label: m === 22 ? '≥ 22x' : `${m}x` })),
    match: (p, v) => {
      if (!p.mag) return false
      const m = Number(v)
      return m === 22 ? p.mag[1] >= 22 : p.mag[0] <= m && m <= p.mag[1]
    },
  },
  {
    kind: 'chips', key: 'obj', label: 'Objektivdiameter', mode: 'or',
    has: (p) => p.objective !== undefined,
    options: () => objBuckets.map(({ value, label }) => ({ value, label })),
    match: (p, v) => {
      const b = objBuckets.find((x) => x.value === v)!
      return p.objective !== undefined && p.objective >= b.min && p.objective <= b.max
    },
  },
  {
    kind: 'range', key: 'weight', label: 'Vægt', unit: 'g', placeholder: ['Min. vægt', 'Max. vægt'],
    get: (p) => p.weight, has: () => true,
  },
  {
    kind: 'chips', key: 'use', label: 'Anvendelse', mode: 'or',
    has: (p) => p.uses.length > 0,
    options: () => Object.entries(useLabels).map(([value, label]) => ({ value, label })),
    match: (p, v) => p.uses.includes(v as never),
  },
  {
    // Properties are cumulative: "Vandtæt" + "ED-glas" means products that have both.
    kind: 'checkbox', key: 'feat', label: 'Egenskaber', mode: 'and',
    has: (p) => p.features.length > 0,
    options: () => Object.entries(featureLabels).map(([value, label]) => ({ value, label })),
    match: (p, v) => p.features.includes(v as never),
  },
  {
    kind: 'checkbox', key: 'avail', label: 'Tilgængelighed', mode: 'or',
    has: () => true,
    options: () => Object.entries(availabilityLabels).map(([value, label]) => ({ value, label })),
    match: (p, v) => p.availability === v,
  },
]

export const facetByKey = Object.fromEntries(facets.map((f) => [f.key, f])) as Record<FacetKey, FacetDef>

// ───────────────────────── Filtering ─────────────────────────

export function inScope(p: Product, s: Pick<FilterState, 'cat' | 'sub'>) {
  if (s.sub) return p.sub === s.sub
  if (s.cat) return subToCategory[p.sub] === s.cat
  return true
}

function matchesFacet(p: Product, f: FacetDef, s: FilterState): boolean {
  if (f.kind === 'range') {
    const r = s[f.key]
    if (!r) return true
    const v = f.get(p)
    return v >= r[0] && v <= r[1]
  }
  const selected = s[f.key]
  if (!selected.length) return true
  return f.mode === 'and' ? selected.every((v) => f.match(p, v)) : selected.some((v) => f.match(p, v))
}

/** Products in the current category, filtered by every facet except `except`. */
export function applyFilters(all: Product[], s: FilterState, except?: FacetKey) {
  return all.filter((p) => inScope(p, s) && facets.every((f) => f.key === except || matchesFacet(p, f, s)))
}

/** Count per option. OR facets ignore their own selection so counts show "what you'd add". */
export function optionCounts(all: Product[], s: FilterState, f: ListFacetDef): Record<string, number> {
  const base = applyFilters(all, s, f.mode === 'or' ? f.key : undefined)
  const counts: Record<string, number> = {}
  for (const o of f.options(all)) counts[o.value] = base.filter((p) => f.match(p, o.value)).length
  return counts
}

export function sortProducts(list: Product[], sort: SortKey) {
  const out = [...list]
  switch (sort) {
    case 'populaer': return out.sort((a, b) => b.popularity - a.popularity)
    case 'nyeste': return out.sort((a, b) => b.added.localeCompare(a.added))
    case 'pris-asc': return out.sort((a, b) => a.price - b.price)
    case 'pris-desc': return out.sort((a, b) => b.price - a.price)
    case 'navn': return out.sort((a, b) => a.name.localeCompare(b.name, 'da'))
  }
}

export function activeFilterCount(s: FilterState) {
  return (['brand', 'mag', 'obj', 'use', 'feat', 'avail'] as ListKey[]).reduce((n, k) => n + s[k].length, 0) +
    (s.price ? 1 : 0) + (s.weight ? 1 : 0)
}

export const brandLabel = (id: string) => brandById[id]?.label ?? id

// ───────────────────────── Range helpers (log scale) ─────────────────────────

export const SLIDER_STEPS = 1000

/** Round to a "nice" number that matches how people think about prices / weights. */
export function niceRound(v: number, mode: 'floor' | 'ceil' | 'round' = 'round') {
  const step = v < 100 ? 1 : v < 1000 ? 10 : v < 10000 ? 100 : 1000
  return Math[mode](v / step) * step
}

export function makeScale(min: number, max: number) {
  const lo = Math.log(Math.max(1, min))
  const hi = Math.log(Math.max(min + 1, max))
  return {
    toPos: (v: number) => Math.round(((Math.log(Math.max(1, v)) - lo) / (hi - lo)) * SLIDER_STEPS),
    toValue: (pos: number) => Math.exp(lo + (pos / SLIDER_STEPS) * (hi - lo)),
  }
}

// ───────────────────────── URL sync ─────────────────────────

const listParams: Record<ListKey, string> = { brand: 'brand', mag: 'forst', obj: 'obj', use: 'anv', feat: 'egen', avail: 'tilg' }
const rangeParams: Record<RangeKey, string> = { price: 'pris', weight: 'vaegt' }

export function stateFromUrl(search: string): FilterState {
  const q = new URLSearchParams(search)
  const s: FilterState = { ...initialState, ...emptyFilters() }
  s.cat = q.get('kat') ?? undefined
  s.sub = q.get('under') ?? undefined
  if (s.sub && !s.cat) s.cat = subToCategory[s.sub]
  for (const [k, param] of Object.entries(listParams) as [ListKey, string][]) {
    const v = q.get(param)
    s[k] = v ? v.split(',').filter(Boolean) : []
  }
  for (const [k, param] of Object.entries(rangeParams) as [RangeKey, string][]) {
    const m = q.get(param)?.match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/)
    if (m) s[k] = [Number(m[1]), Number(m[2])]
  }
  const sort = q.get('sort') as SortKey | null
  if (sort && sortOptions.some((o) => o.value === sort)) s.sort = sort
  if (q.get('vis') === 'liste') s.view = 'list'
  return s
}

export function stateToUrl(s: FilterState): string {
  const q = new URLSearchParams()
  if (s.cat) q.set('kat', s.cat)
  if (s.sub) q.set('under', s.sub)
  for (const [k, param] of Object.entries(listParams) as [ListKey, string][]) if (s[k].length) q.set(param, s[k].join(','))
  for (const [k, param] of Object.entries(rangeParams) as [RangeKey, string][]) {
    const r = s[k]
    if (r) q.set(param, `${r[0]}-${r[1]}`)
  }
  if (s.sort !== 'populaer') q.set('sort', s.sort)
  if (s.view === 'list') q.set('vis', 'liste')
  const str = q.toString().replace(/%2C/g, ',')
  return str ? `?${str}` : ''
}
