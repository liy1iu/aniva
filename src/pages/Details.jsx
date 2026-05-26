import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import MediaDetails from '../components/media/MediaDetails'
import MediaGrid from '../components/media/MediaGrid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getMediaCatalog } from '../services/api'
import { getTypes, toggleSaved } from '../utils/helpers'
import Page from './Page'

function Details() {
  const { id } = useParams()
  const [items, setItems] = useState([])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])

  useEffect(() => {
    getMediaCatalog().then(setItems).catch(() => setItems([]))
  }, [])

  const item = items.find((entry) => entry.id === id)
  // recommendations score shared genres types and vibes
  const recommendations = item
    ? items
      .filter((entry) => entry.id !== item.id)
      .map((entry) => ({
        item: entry,
        score:
          entry.genres.filter((genre) => item.genres.includes(genre)).length * 2 +
          getTypes(entry).filter((type) => getTypes(item).includes(type)).length +
          (entry.vibes || []).filter((vibe) => item.vibes?.includes(vibe)).length * 2,
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || b.item.popularity - a.item.popularity)
      .slice(0, 4)
      .map((entry) => entry.item)
    : []

  if (!item) {
    return (
      <Page className="grid min-h-screen place-items-center px-4 pt-16 text-center">
        <div>
          <h1 className="font-heading text-4xl font-bold text-paper">título não encontrado</h1>
          <Button as={Link} to="/browse" className="mt-6">voltar ao catálogo</Button>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <MediaDetails
        item={item}
        favorites={favorites}
        watchlist={watchlist}
        onToggleFavorite={(mediaId) => setFavorites((list) => toggleSaved(list, mediaId))}
        onToggleWatchlist={(mediaId) => setWatchlist((list) => toggleSaved(list, mediaId))}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-6">
          <p className="font-sans text-sm font-bold lowercase text-neon">recomendações</p>
          <h2 className="font-heading text-3xl font-bold text-paper">talvez você curta também</h2>
        </div>
        <MediaGrid
          items={recommendations}
          favorites={favorites}
          watchlist={watchlist}
          onToggleFavorite={(mediaId) => setFavorites((list) => toggleSaved(list, mediaId))}
          onToggleWatchlist={(mediaId) => setWatchlist((list) => toggleSaved(list, mediaId))}
          emptyMessage="sem recomendações para este título."
        />
      </section>
    </Page>
  )
}

export default Details
