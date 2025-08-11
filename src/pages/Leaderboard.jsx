import { useMemo, useState } from "react"

const sample = [
  { team: "Neon Nova", score: 94, category: "AI" },
  { team: "Quantum Quokka", score: 88, category: "Health" },
  { team: "Pixel Pulse", score: 91, category: "FinTech" },
  { team: "Orbit Ops", score: 85, category: "AI" },
]

export default function Leaderboard() {
  const [q, setQ] = useState("")
  const [sort, setSort] = useState("desc")
  const [cat, setCat] = useState("All")

  const data = useMemo(() => {
    let d = [...sample]
    if (q) d = d.filter((x) => x.team.toLowerCase().includes(q.toLowerCase()))
    if (cat !== "All") d = d.filter((x) => x.category === cat)
    d.sort((a, b) => (sort === "desc" ? b.score - a.score : a.score - b.score))
    return d
  }, [q, sort, cat])

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Leaderboard</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search team…"
          className="px-4 py-2 rounded-md bg-white/10 border border-white/15"
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-2 rounded-md bg-white/10 border border-white/15">
          <option>All</option>
          <option>AI</option>
          <option>Health</option>
          <option>FinTech</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded-md bg-white/10 border border-white/15">
          <option value="desc">Highest first</option>
          <option value="asc">Lowest first</option>
        </select>
      </div>
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
            {data.map((x, i) => (
              <tr key={x.team} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-4">{i + 1}</td>
                <td className="p-4 font-semibold">{x.team}</td>
                <td className="p-4">{x.category}</td>
                <td className="p-4">{x.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* TODO: Replace with backend: GET /leaderboard */}
    </section>
  )
}
