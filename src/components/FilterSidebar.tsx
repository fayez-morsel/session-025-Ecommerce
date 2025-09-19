import type { ChangeEvent } from 'react'
import { useMemo } from 'react'
import { useShopStore, formatSar } from '../store/useShopStore'
import type { SizeOption } from '../store/useShopStore'
import { CheckIcon, ChevronDownIcon, SearchIcon } from './icons'

const sizeOptions: SizeOption[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

const colorOptions = [
  { label: 'Deep Black', hex: '#040404' },
  { label: 'Sky Blue', hex: '#8dd3ff' },
  { label: 'Sunset Orange', hex: '#ffa467' },
  { label: 'Coral Pink', hex: '#ff6f91' },
  { label: 'Mint', hex: '#98f5d0' },
  { label: 'Lavender', hex: '#c4b5fd' },
  { label: 'Canary', hex: '#fef08a' },
  { label: 'Slate Gray', hex: '#94a3b8' },
]

interface FilterSidebarProps {
  className?: string
}

const brandDetails = [
  {
    name: 'Nike',
    count: 123,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
  },
  {
    name: 'Adidas',
    count: 55,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
  },
  {
    name: 'Apple',
    count: 65,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  {
    name: 'New Balance',
    count: 99,
    logo: 'data:image/jpeg;base64,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',
  },
  {
    name: 'Puma',
    count: 325,
    logo: 'data:image/png;base64,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',
  },
  {
    name: 'Uniqlo',
    count: 61,
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAAkFBMVEXtHST////sAADtDBb0iYvydnnsAA/sAAj83N32pqf3tbb5urv1np/yc3b5xMXsBxPtFh71k5X0hIb95+f97+/+9PXtEhvvSEvya27yb3L83t/71NX1lJbzgIPwUFTvQkftIinwXF/6zc73rq/uMTfuLTP5wcLxY2bvPEHwVFj2mpz2p6nxX2PvRUnuNjv+8fIg0MyoAAAJRElEQVR4nO2d2ULqMBCG0xRaRIQItKICsiggbu//dqeiaDMzWdqqpTn578DQ5GuzTJOZkTG3FbbqbsFvyxM2X56w+fKEzZcnbL48YfPlCZsvT9h8ecLmyxM2X56w+fKEzZcnbL48YfP13xOKQV5p5QKDEgUOSqVCoRnsS3pCsZxe5jRBBOIlX2D6jAtc7fNX2AtU4FEqcEk3Pp1IhWYFEPWEUS/I6zxGP29LBZ4iQ4HgEpYYXMoFONmQeCMVuqFLVSfsYsILqcCZkXAM2zZoWRGeS4U6J0wYwA7mHuEINM49wmArz0YOEt7KrXOQMJhLK4aLhH2peS4SBvf5h+gkYTffPicJgzT3EN0k7OWKuUmYOE8YtL5fkhwlzNnfjhIG11/2t6uE3y94rhIGy6P97Szh6thGZwmDnXCd8Jy7Thg8CNcJn2LXCYPUecKPrVOXCRPuOuHH1qnThIetU6cJD1unbhO+b506Ryi39Eq4R3gnfepz9wh5R/r4KtwjvJavyN0j5GPps4icIxwMpc897hwhi5L858RFwr30xXAICzSeUAjpi9HMOULG19I3ffcIxUOgkQuEjMvuPw4SirnrhIzfuk6YPrtOyPioqYRm30ROfnsyhEbvS9tnyGLZ/q6PEDh/rtCFwS2YIhdfBWEEvEprIwSdMEHPkK+kAm3ku6sgZNGJEMKVC3o5Axvz+9zTSBg/nQjhQq4e+BUyLnfS43mSBSG8cl2EaFq/kPppei//Fbk4qwkZl9tcG2G8Bg2Y52bLVIAZEc+1akKxOw1CbH1M+GdPFPweTvnXON5CSQgnqboIGU9gE/p3PI6imC/ObFqnJkwfT4MQLHgHjbq9/Zownte4k2oIGdg6rYtQMPJOk7pHM6mWECy2dRGymHiItLpUtRpC2v7+e0IWv1kSpsQj1BLC7e66CNOlHWCbDDvTERLTWC2EyHChdU5XqiWkprE6CBnv44ZAqerUElLTWC2EqsU5pxE5CE2EcOu0PkL9/l+mGxWggVDco0vVRMj4HjUlp3OuAjQQEgOgLkLGH5X7DkFbU5+BEG+d1kbIUj4l5vZMa2V08uH6ekK8dVofYTa3py1khCRPD/rKTITp5IQIMyOEv/Ry93y03vJYOQI/r28gRKabgvC3Ip2RRMT5btseDtuTq5DHRPw9/MFda5hTC21ViblUYKiIVt+28mqbK/5SiZwKIg0zKdcHWDqUVKLAQXLGgQKAPmuEA/KEzZcnbL48YfPlCZsvT9h8ecLmyxM2X56w+SpFKDIVKvytErWBSxX9UVHCNOI8vL97eRXcZiOKsYcrSWURRRhzvti97Bac80GRqxQiFDF/7K0+T0yT2/Uk4iZI426iXSv5Yri5OW5ibloPXLcLDX5rTyj4bg23vTdLA+NPEEbxDDo13LRS5AapaoE1IX8ljxE7S/WxDPsJwpS3qOOEZM/tUnzaEqbIO+pLfaapqjKh+kgomVhdzJIwulP7LQfBVl1VRULBVT6M7+pqu8+xBXYnpNeaejJdKhtejVBEGq/+TDcWi4fdKfdQW0+mM1XLKxGK8Iau7kvjhRHRhjDWxWN/al/GU8EkbgLMECMTogVhuDQDBkGbnr2rENr4gCCn3hKEQtBnv1Cv5M2sQBhTLlNYygFiTWh2NfkQfWpZnlC82tUbzA02h4kwhMfQSs0oS6o8oS44ShLMTFyUUBPAA/RGjcTShOnWtl6UXroYIRm/M7q9pbhbxEMsTUg9wuRm1SE8JfUP0egFjSbscev9BYanF8jFl6qpLKG4g1cPzufZmxuP77D5iJPd2xNij/oz/rkChRw9XuLtrywhMoNHu08TTfAHeG83uqsaCJF/5Cx3sfgK0uORWJYQpF4IOrnXbYEWygqE0NtcNl2ipfxXYsEoSQg76Vi2seHYwdFI1oSpfCU40mDgS5F4C61CEKW/lKdLuFZONa/Dhrgn0A8vwLwMA8/n1nFPBoFhiEwz4A6qG4h6wlR+a0rQcgDmdHgHShOCkYY8pcBqqfNzKxRhia3cSA6cubSNsDQSygNtB/sGCH0jQsosCc1RsvJ46dlGyRoJZYsCDzMurfzJTxH+WCy3UYAQ/0peTXBwa64FntATekJPSMsTesJ8CzyhJ/SEnpCWJ/SE+RZ4Qk/oCT0hLU/oCfMt8IT/PWHJvIkm/R2hnCyij2qKplKB/S8R4kx3KcgKXpYQbNq/4Wh6+QQF+wyUJZRPfK7RyYycbUJ3km84e1rK7dvCvIkgwYx93kSDQA4FlHSTd/V/tyaE54PwkBfml8F+dCUJwfCAXkGwXVQeNTtCdJyuP+UmOktJQth5xlJ2CgFPuXFWUWvCGOZvHOY9FWDqFTzXlvZUCMGlZU8F6IjGNA6KpnN85PPVHXzcTjHAXqeEw0BpXwwIMZ5/+synfAd9fLSpTornTUx6u3ePocUQp3Kx8Rgy6fg7nJBvtT14DC1xRifKGcuakMwVm3Q6lHs5PgHGhLcdg46IVC63YER6m2k7qTlvoipXLCHKI1n7/54oHQnhbKrRupJfG9M6y0t6oioqTchCO8fdgL6zBQjBf03RiFyTyhMOZubCB001i6EVoa0LrV3eRHtCWxdaU0Ylm7yJVv0UW+VVCcXCqvfQ/uWFCK08vd9CuqIKhCzU/R+MoyamKDYbQmQkEXpReAdWIWSReYAMjSaEVcyMiI1DQhU6WYmQxSbEmdlGsot7EuBtBYta7asTsmiuHYvPFkagdd7Ea/2wV72DViRkaagOnLld2EQgWkdYDpj+MVKJoH+AMOs+F3QAYjKzic0rQJhV9apIhX8Qdrz8GcLsEhwb+cH40jYUuEiks+BiuFJ1VkWE1Q8QvudrXK7zkOPzLbcNAy4YrS5CHl4Ne93NpnvWAlGXtHUonlf9QqJNsDTmD5PpetPfrPcX93Zx8qUIPyijOHtNiwZgx0+xkyCMb4SS1DamSAfxoWKFbaFShawRYLtYYbbVrgqEMCTAPUK4MQ03U09EVQiNpxonoSqEIHRHFxJQoyrlpwHdFEfMnIIqEYJuqrK+61UlQtBNi2Ro/jtVy6JkPOY7AVUjBN1UYX3Xq2qEIIjWmN+gDlXM9QW6qTkPx9+rIiHopvrI+HpUNV/bQHozOEW7zWeka748YfPlCZsvT9h8ecLmyxM2X56w+fofCP8BU7y32X02aBQAAAAASUVORK5CYII=',
  },
]
export function FilterSidebar({ className }: FilterSidebarProps = {}) {
  const filters = useShopStore((state) => state.filters)
  const minCatalogPrice = useShopStore((state) => state.minCatalogPrice)
  const maxCatalogPrice = useShopStore((state) => state.maxCatalogPrice)
  const toggleBrand = useShopStore((state) => state.toggleBrand)
  const toggleSize = useShopStore((state) => state.toggleSize)
  const toggleColor = useShopStore((state) => state.toggleColor)
  const setPriceRange = useShopStore((state) => state.setPriceRange)
  const resetFilters = useShopStore((state) => state.resetFilters)
  const brandQuery = useShopStore((state) => state.brandFilterQuery)
  const setBrandQuery = useShopStore((state) => state.setBrandFilterQuery)
  const expandedSections = useShopStore((state) => state.expandedSections)
  const toggleSection = useShopStore((state) => state.toggleSection)

  const filteredBrands = useMemo(() => {
    if (!brandQuery.trim()) {
      return brandDetails
    }
    const lowered = brandQuery.trim().toLowerCase()
    return brandDetails.filter((brand) => brand.name.toLowerCase().includes(lowered))
  }, [brandQuery])

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, type } = event.target
    const parsed =
      type === 'range'
        ? Number(value)
        : (() => {
            const numericString = value.replace(/[^0-9.]/g, '')
            if (numericString === '') {
              return minCatalogPrice
            }
            const numeric = Number(numericString)
            if (Number.isNaN(numeric)) {
              return null
            }
            return Math.round(numeric * 100)
          })()

    if (parsed === null || Number.isNaN(parsed)) {
      return
    }

    const clamped = Math.min(
      Math.max(parsed, minCatalogPrice),
      Math.max(minCatalogPrice, filters.maxPrice - 50),
    )

    setPriceRange(clamped, filters.maxPrice)
  }

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, type } = event.target
    const parsed =
      type === 'range'
        ? Number(value)
        : (() => {
            const numericString = value.replace(/[^0-9.]/g, '')
            if (numericString === '') {
              return maxCatalogPrice
            }
            const numeric = Number(numericString)
            if (Number.isNaN(numeric)) {
              return null
            }
            return Math.round(numeric * 100)
          })()

    if (parsed === null || Number.isNaN(parsed)) {
      return
    }

    const clamped = Math.max(
      Math.min(parsed, maxCatalogPrice),
      Math.min(maxCatalogPrice, filters.minPrice + 50),
    )

    setPriceRange(filters.minPrice, clamped)
  }

  return (
    <aside
      className={`w-full shrink-0 space-y-6 lg:w-[320px] xl:w-[360px] ${className ?? ''}`.trim()}
    >
      <div className="space-y-6 rounded-[15px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between" >
          <p className="text-sm font-semibold text-slate-600">Filter</p>
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-sky-500 hover:text-sky-600"
          >
            Advanced
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <button
              type="button"
              onClick={() => toggleSection('brand')}
              className="mb-3 flex w-full items-center justify-between rounded-2xl border border-transparent px-2 py-1 text-left transition hover:border-slate-100"
            >
              <h3 className="text-sm font-semibold text-slate-600">Brand</h3>
              <ChevronDownIcon
                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                  expandedSections.brand ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.brand ? (
              <>
                <div className="relative mb-4">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                  <input
                    type="search"
                    value={brandQuery}
                    onChange={(event) => setBrandQuery(event.target.value)}
                    placeholder="Search brand"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-9 text-sm font-medium text-slate-600 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <div className="space-y-2 rounded-[12px] border border-slate-100 p-2">
                  {filteredBrands.map(({ name, count, logo }) => {
                    const isActive = filters.brands.includes(name)
                    return (
                      <label
                        key={name}
                        className={`flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2 transition ${
                          isActive ? 'bg-sky-50' : 'hover:bg-slate-50'
                        }`}
                        onClick={() => toggleBrand(name)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                            <img src={logo} alt={`${name} logo`} className="h-5 w-5 object-contain" />
                          </span>
                          <span className="text-sm font-medium text-slate-600">{name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-slate-400">{count}</span>
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              isActive ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 text-transparent'
                            }`}
                          >
                            <CheckIcon className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </>
            ) : null}
          </section>

          <section>
            <button
              type="button"
              onClick={() => toggleSection('price')}
              className="mb-3 flex w-full items-center justify-between rounded-2xl border border-transparent px-2 py-1 text-left transition hover:border-slate-100"
            >
              <h3 className="text-sm font-semibold text-slate-600">Price</h3>
              <ChevronDownIcon
                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                  expandedSections.price ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.price ? (
              <div className="rounded-[12px] border border-slate-100 p-4">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <span>{formatSar(minCatalogPrice / 100)}</span>
                  <span>{formatSar(maxCatalogPrice / 100)}</span>
                </div>
                <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>{formatSar(filters.minPrice / 100)}</span>
                  <span>{formatSar(filters.maxPrice / 100)}</span>
                </div>
                <div className="relative mb-6 h-12">
                  <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-sky-100" />
                  <div
                    className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-sky-400"
                    style={{
                      left: `${((filters.minPrice - minCatalogPrice) / (maxCatalogPrice - minCatalogPrice)) * 100}%`,
                      right: `${100 - ((filters.maxPrice - minCatalogPrice) / (maxCatalogPrice - minCatalogPrice)) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={minCatalogPrice}
                    max={maxCatalogPrice}
                    step={50}
                    value={filters.minPrice}
                    onChange={handleMinPriceChange}
                    className="price-range-thumb absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 appearance-none bg-transparent"
                  />
                  <input
                    type="range"
                    min={minCatalogPrice}
                    max={maxCatalogPrice}
                    step={50}
                    value={filters.maxPrice}
                    onChange={handleMaxPriceChange}
                    className="price-range-thumb absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 appearance-none bg-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col text-xs font-semibold text-slate-400">
                    Min
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">SAR</span>
                      <input
                        type="number"
                        step={0.5}
                        min={minCatalogPrice / 100}
                        max={maxCatalogPrice / 100}
                        inputMode="decimal"
                        value={(filters.minPrice / 100).toFixed(2)}
                        onChange={handleMinPriceChange}
                        className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col text-xs font-semibold text-slate-400">
                    Max
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">SAR</span>
                      <input
                        type="number"
                        step={0.5}
                        min={minCatalogPrice / 100}
                        max={maxCatalogPrice / 100}
                        inputMode="decimal"
                        value={(filters.maxPrice / 100).toFixed(2)}
                        onChange={handleMaxPriceChange}
                        className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
                      />
                    </div>
                  </label>
                </div>
              </div>
            ) : null}
          </section>

          <section>
            <button
              type="button"
              onClick={() => toggleSection('size')}
              className="mb-3 flex w-full items-center justify-between rounded-2xl border border-transparent px-2 py-1 text-left transition hover:border-slate-100"
            >
              <h3 className="text-sm font-semibold text-slate-600">Size</h3>
              <ChevronDownIcon
                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                  expandedSections.size ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.size ? (
              <div className="flex flex-wrap gap-2 rounded-[12px] border border-slate-100 p-3">
                {sizeOptions.map((option) => {
                  const isActive = filters.sizes.includes(option)
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => toggleSize(option as SizeOption)}
                      className={`min-w-[3rem] rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                        isActive
                          ? 'border-sky-500 bg-sky-50 text-sky-600'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </section>

          <section>
            <button
              type="button"
              onClick={() => toggleSection('color')}
              className="mb-3 flex w-full items-center justify-between rounded-2xl border border-transparent px-2 py-1 text-left transition hover:border-slate-100"
            >
              <h3 className="text-sm font-semibold text-slate-600">Color</h3>
              <ChevronDownIcon
                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                  expandedSections.color ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.color ? (
              <div className="flex flex-wrap gap-3 rounded-[12px] border border-slate-100 p-3">
                {colorOptions.map((option) => {
                  const isActive = filters.colors.includes(option.label)
                  return (
                    <button
                      type="button"
                      key={option.label}
                      onClick={() => toggleColor(option.label)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                        isActive ? 'border-sky-400' : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <span
                        className="inline-block h-7 w-7 rounded-full border border-white"
                        style={{ backgroundColor: option.hex }}
                        aria-label={option.label}
                      />
                    </button>
                  )
                })}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </aside>
  )
}












