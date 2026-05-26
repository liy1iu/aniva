import { BookOpen, Clapperboard, PanelsTopLeft, ScrollText } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  // each category opens the catalog filtered by type
  { label: 'anime', icon: Clapperboard },
  { label: 'mangá', icon: BookOpen },
  { label: 'manhwa', icon: PanelsTopLeft },
  { label: 'manhua', icon: ScrollText },
]

function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="mb-6">
        <p className="font-sans text-sm font-bold lowercase text-neon">categorias</p>
        <h2 className="font-heading text-3xl font-bold text-paper">navegue por tipo</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* opens the catalog already filtered by type */}
        {categories.map(({ label, icon: Icon }) => (
          <Link
            key={label}
            to={`/browse?type=${encodeURIComponent(label)}`}
            className="glass group rounded-lg p-5 transition hover:-translate-y-1 hover:border-neon/45 hover:shadow-[0_18px_70px_rgba(255,0,110,0.16)]"
          >
            <Icon className="text-neon" size={30} />
            <h3 className="mt-8 font-heading text-2xl font-bold text-paper">{label}</h3>
            <p className="mt-2 text-sm text-muted">ver títulos</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategorySection
