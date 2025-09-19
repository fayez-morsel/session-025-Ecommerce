import type { ChangeEvent } from 'react'
import { useMemo } from 'react'
import { useShopStore, buildCartLines, computeCartSummary } from '../store/useShopStore'
import { CartIcon, SearchIcon } from './icons'

export function AppHeader() {
  const searchText = useShopStore((state) => state.filters.searchText)
  const setSearchText = useShopStore((state) => state.setSearchText)
  const openCart = useShopStore((state) => state.setCartOpen)
  const products = useShopStore((state) => state.products)
  const cart = useShopStore((state) => state.cart)

  const cartLines = useMemo(() => buildCartLines(products, cart), [products, cart])
  const cartSummary = useMemo(() => computeCartSummary(cartLines), [cartLines])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-1 flex w-full items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-6">
        <div className="flex flex-shrink-0 items-center gap-3 sm:gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-[15px] bg-sky-500 text-base font-semibold text-white">
            CF
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="flex w-full max-w-[220px] min-w-0 items-center gap-3 rounded-[15px] border border-slate-200 bg-white px-3 py-2 shadow-sm sm:max-w-md sm:px-4 sm:py-0">
            <SearchIcon className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search items"
              className="h-9 w-full bg-transparent text-sm font-medium text-slate-600 outline-none sm:h-10"
            />
          </div>

          <button
            type="button"
            onClick={() => openCart(true)}
            className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-500 sm:h-11 sm:w-11"
            aria-label="Open cart"
          >
            <CartIcon className="h-5 w-5" />
            {cartSummary.totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-sky-500 px-1 text-[0.65rem] font-semibold text-white">
                {cartSummary.totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  )
}
