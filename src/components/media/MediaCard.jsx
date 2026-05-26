import { Heart, ListPlus, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getTypes, isSaved } from '../../utils/helpers'
import { handleFallbackImage } from '../../utils/image'

function MediaCard({ item, favorites = [], watchlist = [], onToggleFavorite, onToggleWatchlist, variant = 'default' }) {
  // controls the active state of the buttons
  const isFav = isSaved(favorites, item.id)
  const isInList = isSaved(watchlist, item.id)
  // some titles can have more than one type
  const types = getTypes(item)
  const cardSurface = variant === 'catalog' ? 'catalog-card' : 'comic-card glass'

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ duration: 0.16 }}
      className={`${cardSurface} group flex h-full flex-col overflow-hidden rounded-lg transition duration-200 hover:-translate-y-1 hover:border-neon/45`}
    >
      <Link to={`/details/${item.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-panel">
          <img src={item.cover} alt={item.title} onError={handleFallbackImage} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
          {/* rating sits on the image for quick scanning */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 font-sans text-sm font-semibold text-paper backdrop-blur">
            <Star size={15} className="fill-neon text-neon" />
            {item.rating}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/details/${item.id}`} className="block">
          <h3 className="line-clamp-2 min-h-14 font-heading text-xl font-bold leading-tight text-paper transition group-hover:text-neon">{item.title}</h3>
        </Link>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {types.map((type) => (
            <span key={type} className="media-label inline-flex w-fit rounded bg-black/45 px-2 py-0.5 text-xs font-bold lowercase text-neon ring-1 ring-white/10">
              {type}
            </span>
          ))}
        </div>
        <div className="mt-4 flex min-h-[5rem] flex-wrap content-start gap-2">
          {item.genres.slice(0, 3).map((genre) => (
            <span key={genre} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-muted">
              {genre}
            </span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
          {/* quick actions stay inside the card */}
          <button
            onClick={() => onToggleFavorite(item.id)}
            aria-label="Alternar favorito"
            className={`inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-2.5 font-heading text-sm font-bold lowercase transition duration-200 ${
              isFav
                ? 'border border-neon bg-neon/20 text-neon'
                : 'border border-white/20 bg-white/[0.06] text-paper hover:border-neon/50 hover:bg-neon/10 hover:text-neon'
            }`}
          >
            <Heart size={21} strokeWidth={2.4} className={isFav ? 'fill-neon text-neon' : ''} />
            {isFav ? 'curtido' : 'curtir'}
          </button>
          <button
            onClick={() => onToggleWatchlist(item.id)}
            aria-label="Alternar watchlist"
            className={`inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-2.5 font-heading text-sm font-bold lowercase transition duration-200 ${
              isInList
                ? 'border border-neon bg-neon/20 text-neon'
                : 'border border-white/20 bg-white/[0.06] text-paper hover:border-neon/50 hover:bg-neon/10 hover:text-neon'
            }`}
          >
            <ListPlus size={17} className={isInList ? 'text-neon' : ''} />
            {isInList ? 'na lista' : 'lista'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default MediaCard
