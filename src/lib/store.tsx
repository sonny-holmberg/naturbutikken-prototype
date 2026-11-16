import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  emptyFilters, stateFromUrl, stateToUrl,
  type FilterState, type ListKey, type RangeKey, type SortKey, type FacetKey,
} from './filters'

type Store = {
  state: FilterState
  setCategory: (cat?: string, sub?: string) => void
  toggle: (key: ListKey, value: string) => void
  setRange: (key: RangeKey, range?: [number, number]) => void
  clearFacet: (key: FacetKey) => void
  clearAll: () => void
  setSort: (sort: SortKey) => void
  setView: (view: FilterState['view']) => void
  cart: number
  addToCart: (name: string) => void
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  toast: { id: number; text: string } | null
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FilterState>(() => stateFromUrl(window.location.search))
  const [cart, setCart] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<Store['toast']>(null)
  const pushNext = useRef(false)

  // Keep the URL in sync. Category changes create history entries (so "back" works); filter tweaks replace.
  useEffect(() => {
    const url = `${window.location.pathname}${stateToUrl(state)}`
    if (url === `${window.location.pathname}${window.location.search}`) return
    if (pushNext.current) window.history.pushState(null, '', url)
    else window.history.replaceState(null, '', url)
    pushNext.current = false
  }, [state])

  useEffect(() => {
    const onPop = () => setState(stateFromUrl(window.location.search))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const setCategory = useCallback((cat?: string, sub?: string) => {
    pushNext.current = true
    // A new category is a new "page": facets differ per category, so filters reset.
    setState((s) => ({ ...s, ...emptyFilters(), cat, sub }))
  }, [])

  const toggle = useCallback((key: ListKey, value: string) => {
    setState((s) => ({ ...s, [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value] }))
  }, [])

  const setRange = useCallback((key: RangeKey, range?: [number, number]) => setState((s) => ({ ...s, [key]: range })), [])

  const clearFacet = useCallback((key: FacetKey) => {
    setState((s) => ({ ...s, [key]: key === 'price' || key === 'weight' ? undefined : [] }))
  }, [])

  const clearAll = useCallback(() => setState((s) => ({ ...s, ...emptyFilters() })), [])
  const setSort = useCallback((sort: SortKey) => setState((s) => ({ ...s, sort })), [])
  const setView = useCallback((view: FilterState['view']) => setState((s) => ({ ...s, view })), [])

  const addToCart = useCallback((name: string) => {
    setCart((c) => c + 1)
    setToast({ id: Date.now(), text: `${name} er lagt i kurven` })
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((f) => {
      const next = new Set(f)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const value = useMemo(
    () => ({ state, setCategory, toggle, setRange, clearFacet, clearAll, setSort, setView, cart, addToCart, favorites, toggleFavorite, toast }),
    [state, setCategory, toggle, setRange, clearFacet, clearAll, setSort, setView, cart, addToCart, favorites, toggleFavorite, toast],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside StoreProvider')
  return s
}
