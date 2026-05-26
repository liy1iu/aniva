import MediaCard from './MediaCard'

function MediaGrid({ items, favorites, watchlist, onToggleFavorite, onToggleWatchlist, emptyMessage = 'Nenhum título encontrado.', cardVariant = 'default' }) {
  // empty state keeps no-result filters clear
  if (!items.length) {
    return (
      <div className="glass rounded-lg p-12 text-center">
        <p className="mb-2 font-heading text-2xl font-bold text-paper">nenhum resultado</p>
        <p className="text-sm text-muted">{emptyMessage}</p>
      </div>
    )
  }

  return (
    // responsive grid with more cards when they fit
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          favorites={favorites}
          watchlist={watchlist}
          onToggleFavorite={onToggleFavorite}
          onToggleWatchlist={onToggleWatchlist}
          variant={cardVariant}
        />
      ))}
    </div>
  )
}

export default MediaGrid
