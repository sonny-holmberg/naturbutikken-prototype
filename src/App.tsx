import { useMemo } from 'react'
import { ActiveFilters } from './components/ActiveFilters'
import { Breadcrumb } from './components/Breadcrumb'
import { CategoryNav } from './components/CategoryNav'
import { FilterPanel } from './components/FilterPanel'
import { Header, Toast } from './components/Header'
import { MobileBar } from './components/MobileBar'
import { ProductGrid } from './components/ProductGrid'
import { ResultCount, SortSelect, ViewToggle } from './components/Toolbar'
import { products } from './data/products'
import { categoryById, SECTION_LABEL, subcategoryById } from './data/taxonomy'
import { applyFilters, sortProducts } from './lib/filters'
import { useStore } from './lib/store'

export default function App() {
  const { state } = useStore()
  const results = useMemo(() => sortProducts(applyFilters(products, state), state.sort), [state])
  const { view: _view, ...queryState } = state
  const resultKey = JSON.stringify(queryState)
  const title = subcategoryById(state.sub)?.label ?? categoryById(state.cat)?.label ?? SECTION_LABEL

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 pt-4 pb-16 lg:px-8 lg:pt-8">
        <h1 className="sr-only">{title}</h1>
        <div className="lg:grid lg:grid-cols-[minmax(300px,340px)_1fr] lg:gap-8">
          <aside className="hidden lg:block" aria-label="Kategorier og filtre">
            <Breadcrumb />
            <div className="mt-8 px-3">
              <CategoryNav key={state.cat ?? 'root'} />
            </div>
            <FilterPanel key={`${state.cat}-${state.sub}`} className="mt-8" />
          </aside>

          <div className="min-w-0">
            <div className="mb-3 lg:hidden">
              <Breadcrumb />
            </div>
            <MobileBar resultCount={results.length} />

            <div className="mt-3 mb-3 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-0">
              <ViewToggle />
              <ResultCount count={results.length} />
              <div className="ml-auto hidden lg:block">
                <SortSelect />
              </div>
            </div>
            <div className="mb-4 empty:hidden">
              <ActiveFilters />
            </div>

            <ProductGrid key={resultKey} results={results} />
          </div>
        </div>
      </main>
      <Toast />
    </>
  )
}
