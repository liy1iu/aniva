import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MediaFilters from '../components/media/MediaFilters'
import MediaGrid from '../components/media/MediaGrid'
import MediaSearch from '../components/media/MediaSearch'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getMediaCatalog } from '../services/api'
import { getTypes, toggleSaved } from '../utils/helpers'
import { validateSearchTerm } from '../utils/validation'
import Page from './Page'

const initialFilters = {
  type: '',
  genre: '',
  vibe: '',
  status: '',
  rating: 0,
  sort: '',
}

function Browse() {
  // reads navbar search on page load
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState({
    ...initialFilters,
    type: searchParams.get('type') || initialFilters.type,
  })
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])
  const debouncedQuery = useDebounce(query)
  const searchError = validateSearchTerm(query)

  useEffect(() => {
    getMediaCatalog().then(setItems).catch(() => setItems([]))
  }, [])

  // filters first then sorts
  const filteredItems = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase()
    const canSearch = !searchError

    const filtered = items.filter((item) => {
      const matchesQuery = !normalizedQuery || !canSearch || item.title.toLowerCase().includes(normalizedQuery)
      const matchesType = !filters.type || getTypes(item).includes(filters.type)
      const matchesGenre = !filters.genre || item.genres.includes(filters.genre)
      const matchesVibe = !filters.vibe || item.vibes?.includes(filters.vibe)
      const matchesStatus = !filters.status || item.status === filters.status
      const matchesRating = item.rating >= filters.rating

      return matchesQuery && matchesType && matchesGenre && matchesVibe && matchesStatus && matchesRating
    })

    return [...filtered].sort((a, b) => {
      if (filters.sort === 'melhor nota') return b.rating - a.rating
      if (filters.sort === 'mais recentes') return b.year - a.year
      if (filters.sort === 'alfabético') return a.title.localeCompare(b.title)
      return 0
    })
  }, [debouncedQuery, filters, items, searchError])

  // counts active filters
  const activeFilterCount = Number(Boolean(filters.type)) +
    Number(Boolean(filters.genre)) +
    Number(Boolean(filters.vibe)) +
    Number(Boolean(filters.status)) +
    Number(filters.rating > 0) +
    Number(filters.sort !== initialFilters.sort)

  return (
    <Page className="min-h-screen px-4 pb-16 pt-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-sans text-sm font-bold lowercase text-neon">catálogo</p>
          <h1 className="font-heading text-4xl font-bold text-paper sm:text-5xl">garimpo completo</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <MediaFilters
            items={items}
            filters={filters}
            activeCount={activeFilterCount}
            onReset={() => setFilters(initialFilters)}
            onChange={(patch) => setFilters((current) => ({ ...current, ...patch }))}
          />
          <section className="space-y-5">
            <MediaSearch value={query} error={searchError} onChange={setQuery} />
            <MediaGrid
              items={filteredItems}
              favorites={favorites}
              watchlist={watchlist}
              onToggleFavorite={(id) => setFavorites((list) => toggleSaved(list, id))}
              onToggleWatchlist={(id) => setWatchlist((list) => toggleSaved(list, id))}
              emptyMessage="Nada bateu com essa busca. Tente limpar filtros ou explorar outra vibe."
              cardVariant="catalog"
            />
          </section>
        </div>
      </div>
    </Page>
  )
}

export default Browse
