import { useMemo } from 'react'
import { AppHeader } from './components/AppHeader'
import { CartDrawer } from './components/CartDrawer'
import { FilterSidebar } from './components/FilterSidebar'
import { ProductCard } from './components/ProductCard'
import { CloseIcon, FilterIcon } from './components/icons'
import { SortSelect } from './components/SortSelect'
import { ViewToggle } from './components/ViewToggle'
import { useShopStore, computeFilteredProducts } from './store/useShopStore'

export default function App() {
  const products = useShopStore((state) => state.products)
  const filters = useShopStore((state) => state.filters)
  const isMobileFilterOpen = useShopStore((state) => state.isMobileFilterOpen)
  const setMobileFilterOpen = useShopStore((state) => state.setMobileFilterOpen)
  const viewMode = useShopStore((state) => state.viewMode)

  const filteredProducts = useMemo(
    () => computeFilteredProducts(products, filters),
    [products, filters],
  )
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppHeader />
      <CartDrawer />
      <div className="mx-1 w-full max-w-full px-3 sm:px-6">
        <div className="rounded-[15px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="space-y-2 text-slate-700 sm:space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Home <span className="mx-1 text-slate-400">&gt;</span>
              <span className="text-slate-400">Clothes</span>
            </p>
            <h1 className="text-lg font-semibold text-slate-800">64 result for clothes</h1>
          </div>
        </div>
      </div>
      <main className="mx-1 flex w-full max-w-full flex-col gap-4 px-3 py-4 sm:px-6 lg:flex-row lg:gap-6">
        <div className="hidden w-[300px] lg:block lg:mr-6 xl:w-[340px] xl:mr-8">
          <FilterSidebar />
        </div>

        <section className="flex-1 space-y-6">
          <header className="flex flex-col gap-3 rounded-[15px] border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-4">
            <div className="flex w-full items-center justify-center sm:w-auto sm:flex-1 sm:justify-start">
              <ViewToggle />
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="flex w-full items-center justify-center gap-3 rounded-[15px] border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-600 shadow-sm transition hover:border-sky-300 hover:text-sky-700 lg:hidden sm:w-auto sm:justify-start"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-white">
                  <FilterIcon className="h-3.5 w-3.5" />
                </span>
                Filter
              </button>
              <div className="w-full sm:w-auto">
                <SortSelect />
              </div>
            </div>
          </header>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-12 text-center text-sm font-medium text-slate-400">
              No items match your filters. Try adjusting brand, price, or color options.
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {isMobileFilterOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Filters</p>
                <p className="text-sm font-semibold text-slate-700">Refine your search</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-slate-300"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar className="h-full rounded-none border-0 bg-white p-6 shadow-none" />
          </div>
        </div>
      ) : null}
    </div>
  )
}


