import { useState } from "react"

const defaultRubric = [
  { id: "innovation", label: "Innovation", max: 10 },
  { id: "impact", label: "Impact", max: 10 },
  { id: "execution", label: "Execution", max: 10 },
  { id: "presentation", label: "Presentation", max: 10 },
]

const TEAMS = [
  { id: "t1", name: "Neon Nova" },
  { id: "t2", name: "Pixel Pulse" },
  { id: "t3", name: "Quantum Quokka" },
]

export default function Scoring() {
  const [rubric, setRubric] = useState(defaultRubric)
  const [scores, setScores] = useState({})

  const updateScore = (teamId, critId, value) => {
    const v = Math.max(0, Number(value) || 0)
    setScores((s) => ({
      ...s,
      [teamId]: { ...(s[teamId] || {}), [critId]: v },
    }))
  }

  const totalFor = (teamId) =>
    (rubric || []).reduce((sum, c) => sum + (scores?.[teamId]?.[c.id] || 0), 0)

  const addCriterion = () =>
    setRubric((r) => [...r, { id: crypto.randomUUID(), label: "New Criterion", max: 10 }])

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Scoring</h1>

      <div className="card p-6 mb-8">
        <h2 className="font-semibold mb-3">Rubric</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {rubric.map((c, idx) => (
            <div key={c.id} className="bg-white/5 rounded-md p-3 border border-white/10">
              <input
                className="w-full bg-transparent font-semibold"
                value={c.label}
                onChange={(e) =>
                  setRubric((r) => r.map((x, i) => (i === idx ? { ...x, label: e.target.value } : x)))
                }
              />
              <div className="text-xs text-white/60 mt-1">Max: {c.max}</div>
            </div>
          ))}
          <button onClick={addCriterion} className="px-4 py-2 rounded-md bg-pink-500 hover:bg-pink-400 font-semibold">
            + Add Criterion
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-2xl border border-white/10">
        <table className="w-full bg-black/30">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">Team</th>
              {rubric.map((c) => (
                <th key={c.id} className="p-3 text-left">{c.label} / {c.max}</th>
              ))}
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {TEAMS.map((t) => (
              <tr key={t.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-3 font-semibold">{t.name}</td>
                {rubric.map((c) => (
                  <td key={c.id} className="p-3">
                    <input
                      type="number"
                      min={0}
                      max={c.max}
                      value={scores?.[t.id]?.[c.id] ?? ""}
                      onChange={(e) => updateScore(t.id, c.id, e.target.value)}
                      className="w-24 px-3 py-2 rounded-md bg-white/10 border border-white/15"
                    />
                  </td>
                ))}
                <td className="p-3 font-bold text-pink-300">{totalFor(t.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* TODO: GET /rubric, PUT /rubric ; GET /teams ; POST /scores */}
    </section>
  )
}
