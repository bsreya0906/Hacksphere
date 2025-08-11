import { useState } from "react"

const JUDGES = [
  { id: 1, name: "Ava Singh", expertise: ["AI", "ML"], available: true },
  { id: 2, name: "Liam Chen", expertise: ["FinTech", "Data"], available: false },
  { id: 3, name: "Noah Patel", expertise: ["Health", "Design"], available: true },
]

export default function Judges() {
  const [list, setList] = useState(JUDGES)

  const toggle = (id) =>
    setList((s) =>
      s.map((j) => (j.id === id ? { ...j, available: !j.available } : j))
    )

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Judges</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((j) => (
          <div key={j.id} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{j.name}</h3>
                <p className="text-white/70 text-sm">{j.expertise.join(" • ")}</p>
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs ${j.available ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                  {j.available ? "Available" : "Busy"}
                </span>
              </div>
            </div>
            <button onClick={() => toggle(j.id)} className="mt-4 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/15">
              Toggle Availability
            </button>
          </div>
        ))}
      </div>
      {/* TODO: GET /judges, PATCH /judges/:id */}
    </section>
  )
}
