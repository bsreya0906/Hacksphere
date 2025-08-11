import { Link, NavLink } from "react-router-dom"
import logo from "../media/logo.svg"

const nav = [
  { to: "/", label: "Home" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/judges", label: "Judges" },
  { to: "/scoring", label: "Scoring" },
  { to: "/register", label: "Register" },
  { to: "/submit-score", label: "Submit Score" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-40 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="HackSphere" className="h-8 w-8" />
          <span className="text-xl font-extrabold text-pink-400">HackSphere</span>
        </Link>
        <nav className="flex gap-6">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm font-medium hover:text-pink-400 transition ${isActive ? "text-pink-400" : "text-white/80"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
