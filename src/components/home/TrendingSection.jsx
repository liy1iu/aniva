import MediaCard from '../media/MediaCard'

function TrendingSection({ items, favorites, watchlist, onToggleFavorite, onToggleWatchlist }) {
  // uses popularity to build the home shelf
  const trending = [...items].sort((a, b) => b.popularity - a.popularity).slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-sans text-sm font-bold lowercase text-neon">em alta</p>
          <h2 className="font-heading text-3xl font-bold text-paper">títulos em destaque</h2>
        </div>
      </div>
      <div className="-m-2 grid auto-cols-[minmax(230px,1fr)] grid-flow-col gap-5 overflow-x-auto p-2 pb-6 lg:grid-flow-row lg:grid-cols-3 xl:grid-cols-6">
        {trending.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            favorites={favorites}
            watchlist={watchlist}
            onToggleFavorite={onToggleFavorite}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))}
      </div>
    </section>
  )
}

export default TrendingSection
