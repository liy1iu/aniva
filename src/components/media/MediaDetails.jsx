import { AlertTriangle, BookOpen, Clapperboard, Heart, ListPlus, Star, Users } from 'lucide-react'
import Button from '../common/Button'
import { getFormatStats, getTypes, isSaved } from '../../utils/helpers'
import { handleFallbackImage } from '../../utils/image'

function MediaDetails({ item, favorites, watchlist, onToggleFavorite, onToggleWatchlist }) {
  // details use richer data than cards
  const types = getTypes(item)
  const formats = getFormatStats(item)

  return (
    <section className="relative min-h-screen px-4 pb-16 pt-24 sm:px-6">
      <div className="absolute inset-0 -z-10">
        {/* blurred banner sets the page background */}
        <img src={item.banner || item.cover} alt="" onError={handleFallbackImage} className="h-full w-full object-cover opacity-25 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink to-ink" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">
        <img src={item.cover} alt={`Capa de ${item.title}`} onError={handleFallbackImage} className="neon-ring aspect-[3/4] w-full max-w-sm rounded-lg object-cover" />
        <div className="self-end">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <span key={type} className="rounded bg-black/60 px-2 py-0.5 font-sans text-sm font-bold lowercase text-neon ring-1 ring-white/10">
                {type}
              </span>
            ))}
            <span className="rounded bg-black/60 px-2 py-0.5 font-sans text-sm font-semibold text-muted ring-1 ring-white/10">{item.year}</span>
          </div>
          <h1 className="mt-2 max-w-4xl font-heading text-4xl font-bold leading-tight text-paper sm:text-6xl">{item.title}</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-neon px-3 py-1 font-sans font-bold text-white">
              <Star size={17} className="fill-white" />
              {item.rating}
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-muted">{item.status}</span>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{item.synopsis}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.genres.map((genre) => (
              <span key={genre} className="rounded-md border border-neon/20 bg-neon/10 px-3 py-1 text-sm text-paper">
                {genre}
              </span>
            ))}
          </div>
          {item.vibes?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {/* vibe tags describe the title tone */}
              {item.vibes.map((vibe) => (
                <span key={vibe} className="rounded-md border border-cyan/20 bg-cyan/5 px-3 py-1 text-sm text-muted">
                  {vibe}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => onToggleFavorite(item.id)}>
              <Heart size={18} className={isSaved(favorites, item.id) ? 'fill-white' : ''} />
              curtir
            </Button>
            <Button variant="secondary" onClick={() => onToggleWatchlist(item.id)}>
              <ListPlus size={18} className={isSaved(watchlist, item.id) ? 'text-neon' : ''} />
              colocar na lista
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
        <InfoPanel icon={<Clapperboard size={18} />} title="produção">
          <InfoLine label="estúdio" value={item.studio} />
          <InfoLine label="autor" value={item.author} />
          {formats.length ? (
            <div className="mt-4">
              {/* formats separate episodes chapters and similar counts */}
              <p className="mb-2 text-sm font-bold lowercase text-paper">formatos</p>
              <div className="space-y-2">
                {formats.map((format) => (
                  <div key={`${format.type}-${format.length}`} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                    <p className="text-sm font-bold lowercase text-neon">{format.type}</p>
                    <p className="text-sm text-muted">{format.length}</p>
                    {format.note ? <p className="mt-1 text-xs text-muted">{format.note}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </InfoPanel>

        <InfoPanel icon={<BookOpen size={18} />} title="onde assistir/ler">
          <PlatformGroup label="streaming" platforms={item.platforms?.streaming} />
          <PlatformGroup label="leitura" platforms={item.platforms?.reading} />
          {item.platforms?.note ? <p className="mt-3 text-xs leading-5 text-muted">{item.platforms.note}</p> : null}
        </InfoPanel>

        <InfoPanel icon={<AlertTriangle size={18} />} title="avisos">
          {item.warnings?.length ? (
            <div className="flex flex-wrap gap-2">
              {item.warnings.map((warning) => (
                <span key={warning} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-muted">
                  {warning}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">sem avisos cadastrados.</p>
          )}
        </InfoPanel>
      </div>

      {item.characters?.length ? (
        <div className="mx-auto mt-5 max-w-7xl">
          <InfoPanel icon={<Users size={18} />} title="personagens principais">
            <div className="grid gap-3 md:grid-cols-3">
              {item.characters.map((character) => (
                <article key={character.name} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-heading text-lg font-bold text-paper">{character.name}</p>
                  <p className="text-xs font-bold lowercase text-neon">{character.role}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{character.description}</p>
                </article>
              ))}
            </div>
          </InfoPanel>
        </div>
      ) : null}
    </section>
  )
}

function InfoPanel({ icon, title, children }) {
  return (
    // small panel for detail blocks
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center gap-2 text-neon">
        {icon}
        <h2 className="font-heading text-xl font-bold lowercase text-paper">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function InfoLine({ label, value }) {
  return (
    <p className="mb-2 text-sm text-muted">
      <span className="font-bold lowercase text-paper">{label}: </span>
      {value || 'não informado'}
    </p>
  )
}

function PlatformGroup({ label, platforms = [] }) {
  // empty groups make missing info explicit
  if (!platforms.length) {
    return (
      <p className="mb-2 text-sm text-muted">
        <span className="font-bold lowercase text-paper">{label}: </span>
        não cadastrado
      </p>
    )
  }

  return (
    <div className="mb-3">
      <p className="mb-2 text-sm font-bold lowercase text-paper">{label}</p>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <a key={platform.name} href={platform.url} target="_blank" rel="noopener" className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-muted transition hover:border-neon/50 hover:text-neon">
            {platform.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default MediaDetails
