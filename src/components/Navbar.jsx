import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full overflow-x-hidden sticky top-0 z-50 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Brand */}
          <a href="/" className="flex items-center gap-2 min-w-0">
            <img src="/media/logo.svg" alt="HackSphere" className="h-8 w-8 shrink-0" />
            <span className="truncate font-semibold text-white">HackSphere</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 md:gap-6">
            <a href="/" className="text-white/90 hover:text-white">Home</a>
            <a href="/leaderboard" className="text-white/90 hover:text-white">Leaderboard</a>
            <a href="/judges" className="text-white/90 hover:text-white">Judges</a>
            <a href="/scoring" className="text-white/90 hover:text-white">Scoring</a>
            <a href="/register" className="text-white/90 hover:text-white">Register</a>
            <a href="/submit" className="text-white/90 hover:text-white">Submit Score</a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
          <div className="py-2 border-t border-white/10">
            <a href="/" className="block px-2 py-2 text-white/90 hover:bg-white/10 rounded">Home</a>
            <a href="/leaderboard" className="block px-2 py-2 text-white/90 hover:bg-white/10 rounded">Leaderboard</a>
            <a href="/judges" className="block px-2 py-2 text-white/90 hover:bg-white/10 rounded">Judges</a>
            <a href="/scoring" className="block px-2 py-2 text-white/90 hover:bg-white/10 rounded">Scoring</a>
            <a href="/register" className="block px-2 py-2 text-white/90 hover:bg-white/10 rounded">Register</a>
            <a href="/submit" className="block px-2 py-2 text-white/90 hover:bg-white/10 rounded">Submit Score</a>
          </div>
        </div>
      </nav>
    </header>
  )
}
