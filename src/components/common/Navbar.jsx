import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'

const links = [
  // main navigation links
  { to: '/', label: 'início' },
  { to: '/browse', label: 'catálogo' },
  { to: '/favorites', label: 'favoritos' },
  { to: '/watchlist', label: 'watchlist' },
  { to: '/suggestions', label: 'indicações' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  // sends search to the catalog and closes the mobile menu
  function submitSearch(event) {
    event.preventDefault()
    navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink to="/" className="flex h-10 items-center" aria-label="Aniva início">
          <img src="/aniva-logo.png" alt="" className="h-9 w-auto object-contain" />
        </NavLink>

        <div className="hidden items-center gap-2 lg:flex">
          {/* desktop links highlight the active page */}
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-semibold lowercase transition ${
                  isActive ? 'bg-neon/15 text-neon' : 'text-muted hover:bg-white/5 hover:text-paper'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <form onSubmit={submitSearch} className="hidden w-full max-w-xs items-center rounded-md border border-white/10 bg-white/[0.06] px-3 lg:flex">
          <Search size={17} className="text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-paper outline-none placeholder:text-muted"
            placeholder="buscar títulos"
          />
        </form>

        <Button variant="secondary" className="h-10 w-10 px-0 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="abrir menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-ink px-4 py-4 lg:hidden">
          {/* mobile menu repeats search and nav links */}
          <form onSubmit={submitSearch} className="mb-4 flex items-center rounded-md border border-white/10 bg-white/[0.06] px-3">
            <Search size={17} className="text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 flex-1 bg-transparent px-3 text-sm text-paper outline-none"
              placeholder="buscar títulos"
            />
          </form>
          <div className="grid gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-sm font-semibold lowercase transition ${
                    isActive ? 'bg-neon/15 text-neon' : 'text-muted hover:bg-white/5 hover:text-paper'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
