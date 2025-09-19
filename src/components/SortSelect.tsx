import { useEffect, useRef, useState } from 'react'
import { useShopStore } from '../store/useShopStore'
import type { SortOption } from '../store/useShopStore'
import { ChevronDownIcon, CheckIcon } from './icons'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Alphabetical A - Z' },
  { value: 'name-desc', label: 'Alphabetical Z - A' },
]

export function SortSelect() {
  const sortBy = useShopStore((state) => state.filters.sortBy)
  const setSortBy = useShopStore((state) => state.setSortBy)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent | FocusEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('focusin', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('focusin', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selectedLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? sortOptions[0]!.label

  const handleSelect = (option: SortOption) => {
    setSortBy(option)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 rounded-[15px] border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-sky-300 sm:px-4"
      >
        <span className="text-xs uppercase tracking-wide text-slate-400">Sort by</span>
        <span className="flex-1 text-right text-sm font-semibold text-slate-600">
          {selectedLabel}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-slate-300 transition-transform ${isOpen ? 'rotate-180 text-slate-500' : ''}`}
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-2 w-full min-w-[220px] overflow-hidden rounded-[15px] border border-slate-200 bg-white shadow-lg"
        >
          {sortOptions.map((option) => {
            const isActive = option.value === sortBy
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm font-semibold transition ${
                    isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{option.label}</span>
                  {isActive ? <CheckIcon className="h-4 w-4" /> : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
