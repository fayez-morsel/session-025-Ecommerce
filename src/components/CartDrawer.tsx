import { useMemo } from 'react'
import {
  useShopStore,
  buildCartLines,
  computeCartSummary,
  formatSar,
  getProductPriceSar,
} from '../store/useShopStore'
import { CloseIcon } from './icons'

export function CartDrawer() {
  const isCartOpen = useShopStore((state) => state.isCartOpen)
  const setCartOpen = useShopStore((state) => state.setCartOpen)
  const products = useShopStore((state) => state.products)
  const cart = useShopStore((state) => state.cart)
  const increment = useShopStore((state) => state.incrementCartItem)
  const decrement = useShopStore((state) => state.decrementCartItem)
  const remove = useShopStore((state) => state.removeFromCart)
  const clear = useShopStore((state) => state.clearCart)

  const cartLines = useMemo(() => buildCartLines(products, cart), [products, cart])
  const cartSummary = useMemo(() => computeCartSummary(cartLines), [cartLines])

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm transition ${
        isCartOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 h-full w-full"
      />

      <aside
        className={`relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-700">Shopping Cart</h2>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {cartSummary.totalItems} item{cartSummary.totalItems === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-slate-300"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartLines.length === 0 ? (
            <div className="flex min-h-full flex-col items-center justify-center text-center text-sm text-slate-400">
              <p>Your cart is empty.</p>
              <p className="mt-1">Add items to review them here.</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {cartLines.map((line) => (
                <li key={line.product.id} className="flex gap-4">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {line.product.brand}
                          </p>
                          <p className="text-sm font-semibold text-slate-700">{line.product.name}</p>
                          <p className="text-xs font-medium text-slate-500">
                            {formatSar(getProductPriceSar(line.product))}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.product.id)}
                          className="text-xs font-semibold text-slate-400 underline decoration-dotted underline-offset-4 hover:text-slate-600"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Size {line.product.size} | Color {line.product.color}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrement(line.product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-500 hover:border-slate-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-slate-600">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(line.product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-500 hover:border-slate-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        {formatSar(line.subtotal)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-slate-200 px-6 py-6">
          <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>Total</span>
            <span>
              {cartLines.length > 0 ? formatSar(cartSummary.totalPrice) : formatSar(0)}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={clear}
              disabled={cartLines.length === 0}
              className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear Cart
            </button>
            <button
              type="button"
              disabled={cartLines.length === 0}
              className="flex-1 rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
