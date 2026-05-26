import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Details from './pages/Details'
import Favorites from './pages/Favorites'
import Suggestions from './pages/Suggestions'
import Watchlist from './pages/Watchlist'
import './App.css'

function App() {
  const location = useLocation()

  // resets scroll after route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search])

  return (
    <div className="site-shell min-h-screen bg-[#0F0F0F] text-[#E5E5E5]">
      <Navbar />
      <main className="relative z-10">
        {/* animates page transitions */}
        <AnimatePresence mode="sync">
          <Routes location={location} key={`${location.pathname}${location.search}`}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/suggestions" element={<Suggestions />} />
          </Routes>
        </AnimatePresence>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
