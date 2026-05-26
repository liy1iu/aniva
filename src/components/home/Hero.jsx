import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../common/Button'
import DotCanvas from '../common/DotCanvas'
import { handleFallbackImage } from '../../utils/image'
import { getPrimaryType } from '../../utils/helpers'

function Hero({ featured }) {
  return (
    <section className="relative min-h-[680px] overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      {/* animated dotted background for the hero */}
      <DotCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/45 to-ink" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-md border border-neon/25 bg-neon/10 px-3 py-1 text-sm font-semibold lowercase text-neon">
            <Sparkles size={16} />
            anime, mangá, manhwa e manhua
          </span>
          <h1 className="mt-6 max-w-4xl">
            <img src="/aniva-logo.png" alt="ANIVA" className="h-auto w-full max-w-[34rem] object-contain" />
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-9 text-paper sm:text-3xl sm:leading-10">
            Descubra seu próximo anime, mangá, manhwa ou manhua.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Explore títulos, salve favoritos e monte uma lista do que vale assistir ou ler depois.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/browse">
              ver catálogo
              <ArrowRight size={18} />
            </Button>
            <Button as={Link} to="/suggestions" variant="secondary">conta e indicações</Button>
          </div>
        </div>

        {featured ? (
          // featured title changes daily from the catalog
          <Link to={`/details/${featured.id}`} className="glass comic-card group block overflow-hidden rounded-lg">
            <div className="relative aspect-[16/11]">
              <img src={featured.banner || featured.cover} alt={featured.title} onError={handleFallbackImage} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="eager" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <p className="rounded bg-black/70 px-2 py-0.5 font-sans text-xs font-bold lowercase text-neon ring-1 ring-white/10">{getPrimaryType(featured)}</p>
                  <span className="flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 font-sans text-xs font-semibold text-paper backdrop-blur">
                    <Star size={11} className="fill-neon text-neon" />
                    {featured.rating}
                  </span>
                </div>
                <p className="font-sans text-sm font-bold lowercase text-neon">destaque</p>
                <h2 className="mt-1 font-heading text-3xl font-bold text-paper">{featured.title}</h2>
              </div>
            </div>
          </Link>
        ) : null}
      </div>
    </section>
  )
}

export default Hero
