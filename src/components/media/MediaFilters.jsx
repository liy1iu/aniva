import { SlidersHorizontal } from 'lucide-react'
import { uniqueTypes, uniqueValues } from '../../utils/helpers'

function MediaFilters({ items, filters, onChange, onReset, activeCount = 0 }) {
  // options come from catalog data
  const types = uniqueTypes(items)
  const genres = uniqueValues(items, 'genres')
  const vibes = uniqueValues(items, 'vibes')
  const statuses = uniqueValues(items, 'status')

  return (
    <aside className="glass h-fit rounded-lg p-4 lg:sticky lg:top-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-neon" />
          <h2 className="font-heading text-lg font-bold text-paper">filtros</h2>
        </div>
        {activeCount ? (
          // only appears when there is an active filter
          <button type="button" onClick={onReset} className="rounded-md border border-neon/35 px-2 py-1 text-xs font-bold lowercase text-neon hover:bg-neon/10">
            limpar {activeCount}
          </button>
        ) : null}
      </div>

      <div className="space-y-5">
        <FilterSelect label="tipo" value={filters.type} options={types} onChange={(value) => onChange({ type: value })} />
        <FilterSelect label="gênero" value={filters.genre} options={genres} onChange={(value) => onChange({ genre: value })} />
        <FilterSelect label="vibe" value={filters.vibe} options={vibes} onChange={(value) => onChange({ vibe: value })} />
        <FilterSelect label="status" value={filters.status} options={statuses} onChange={(value) => onChange({ status: value })} />
        <FilterSelect label="ordenar" value={filters.sort} options={['melhor nota', 'mais recentes', 'alfabético']} onChange={(value) => onChange({ sort: value })} />

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-paper">nota mínima: {filters.rating}</span>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={filters.rating}
            onChange={(event) => onChange({ rating: Number(event.target.value) })}
            className="w-full accent-[#FF006E]"
          />
        </label>
      </div>
    </aside>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    // reusable select for filters
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-paper">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-[#161616] px-3 text-sm text-paper outline-none focus:border-neon/70">
        <option value="">todos</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default MediaFilters
