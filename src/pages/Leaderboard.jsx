import { useEffect, useMemo, useState } from "react"

const CATEGORIES = ["All", "AI", "Health", "FinTech", "Web", "Mobile"]

const SAMPLE = [
  { team: "Neon Nova", score: 94, category: "AI" },
  { team: "Quantum Quokka", score: 88, category: "Health" },
  { team: "Pixel Pulse", score: 91, category: "FinTech" },
  { team: "Orbit Ops", score: 85, category: "AI" },
  { team: "Script Sprinters", score: 79, category: "Web" },
  { team: "Byte Bards", score: 83, category: "Mobile" },
]

export default function Leaderboard() {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("All")
  const [sort, setSort] = useState("desc")

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setRows(SAMPLE)
        setError(null)
      } catch (e) {
        setError("Failed to load leaderboard.")
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const data = useMemo(() => {
    let d = Array.isArray(rows) ? [...rows] : []
    if (q.trim()) {
      const qq = q.trim().toLowerCase()
      d = d.filter((x) => x.team?.toLowerCase().includes(qq))
    }
    if (cat !== "All") {
      d = d.filter((x) => x.category === cat)
    }
    d.sort((a, b) => (sort === "desc" ? b.score - a.score : a.score - b.score))
    return d
  }, [rows, q, cat, sort])

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Leaderboard</h1>

      {/* Controls */}
      <div className="card p-4 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search team…"
            className="px-4 py-2 rounded-md bg-[#1a1b22] border border-white/25 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
            aria-label="Search team"
          />
          <Select value={cat} onChange={setCat}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Select value={sort} onChange={setSort}>
            <option value="desc">Highest first</option>
            <option value="asc">Lowest first</option>
          </Select>
        </div>
        <div className="text-sm text-white/70">
          {loading ? "Loading…" : `Total: ${data.length}`}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full bg-black/30">
          <thead className="bg-white/10">
            <tr>
              <th className="text-left p-4">Rank</th>
              <th className="text-left p-4">Team</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="p-6 text-white/70">Loading leaderboard…</td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan={4} className="p-6 text-red-300">{error}</td>
              </tr>
            )}
            {!loading && !error && data.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-white/70">No teams match your filters.</td>
              </tr>
            )}
            {!loading && !error && data.map((x, i) => (
              <tr key={`${x.team}-${i}`} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-4">{i + 1}</td>
                <td className="p-4 font-semibold">{x.team}</td>
                <td className="p-4">{x.category}</td>
                <td className="p-4">{x.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-white/50 mt-3">
        Tip: Replace SAMPLE with GET /api/leaderboard.
      </p>
    </section>
  )
}

function Select({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pr-9 px-4 py-2 rounded-md bg-[#1a1b22] border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-pink-400/60"
      >
        {children}
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/80"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5.25 7.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <style>{`
        select option { color: #ffffff; background: #0e0f14; }
        select option:checked { background: #2a2b36; }
        select option:hover { background: #232432; }
      `}</style>
    </div>
  )
}
