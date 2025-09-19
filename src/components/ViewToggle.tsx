import { useShopStore } from '../store/useShopStore'

export function ViewToggle() {
  const viewMode = useShopStore((state) => state.viewMode)
  const setViewMode = useShopStore((state) => state.setViewMode)

  return (
    <div className="flex items-center gap-2 rounded-[15px] border border-slate-200 bg-white px-2 py-1 text-slate-500 shadow-sm">
      <button
        type="button"
        onClick={() => setViewMode('grid')}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
          viewMode === 'grid' ? 'bg-sky-500 text-white' : 'hover:bg-slate-100'
        }`}
        aria-label="Grid view"
      >
        <span className="grid grid-cols-2 gap-0.5">
          <span className="h-2 w-2 rounded bg-current" />
          <span className="h-2 w-2 rounded bg-current" />
          <span className="h-2 w-2 rounded bg-current" />
          <span className="h-2 w-2 rounded bg-current" />
        </span>
      </button>
      <button
        type="button"
        onClick={() => setViewMode('list')}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
          viewMode === 'list' ? 'bg-sky-500 text-white' : 'hover:bg-slate-100'
        }`}
        aria-label="List view"
      >
        <span className="flex h-3 w-4 flex-col justify-between">
          <span className="h-1 w-full rounded bg-current" />
          <span className="h-1 w-full rounded bg-current" />
          <span className="h-1 w-full rounded bg-current" />
        </span>
      </button>
    </div>
  )
}
