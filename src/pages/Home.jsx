import { useEffect, useState } from 'react'
import CategorySection from '../components/home/CategorySection'
import Hero from '../components/home/Hero'
import TrendingSection from '../components/home/TrendingSection'
import UserStats from '../components/user/UserStats'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getMediaCatalog } from '../services/api'
import { toggleSaved } from '../utils/helpers'
import Page from './Page'

function Home() {
  const [items, setItems] = useState([])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])

  // loads the catalog once on home
  useEffect(() => {
    getMediaCatalog().then(setItems).catch(() => setItems([]))
  }, [])

  // rotates the featured title by day
  const featured = items.length ? items[new Date().getDate() % items.length] : null

  return (
    <Page>
      <Hero featured={featured} />
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <UserStats favoritesCount={favorites.length} watchlistCount={watchlist.length} catalogCount={items.length} />
      </section>
      <TrendingSection
        items={items}
        favorites={favorites}
        watchlist={watchlist}
        onToggleFavorite={(id) => setFavorites((list) => toggleSaved(list, id))}
        onToggleWatchlist={(id) => setWatchlist((list) => toggleSaved(list, id))}
      />
      <CategorySection />
    </Page>
  )
}

export default Home
