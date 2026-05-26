import { useEffect, useState } from 'react'
import WatchlistGrid from '../components/user/Watchlist'
import UserStats from '../components/user/UserStats'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getMediaCatalog } from '../services/api'
import { toggleSaved } from '../utils/helpers'
import Page from './Page'

function Watchlist() {
  const [items, setItems] = useState([])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])

  useEffect(() => {
    getMediaCatalog().then(setItems).catch(() => setItems([]))
  }, [])

  // shows titles saved in the watchlist
  const watchlistItems = items.filter((item) => watchlist.includes(item.id))

  return (
    <Page className="min-h-screen px-4 pb-16 pt-24 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="font-sans text-sm font-bold lowercase text-neon">sua área</p>
          <h1 className="font-heading text-4xl font-bold text-paper sm:text-5xl">watchlist</h1>
        </div>
        <UserStats favoritesCount={favorites.length} watchlistCount={watchlist.length} catalogCount={items.length} />
        <WatchlistGrid
          items={watchlistItems}
          favorites={favorites}
          watchlist={watchlist}
          onToggleFavorite={(id) => setFavorites((list) => toggleSaved(list, id))}
          onToggleWatchlist={(id) => setWatchlist((list) => toggleSaved(list, id))}
        />
      </div>
    </Page>
  )
}

export default Watchlist
