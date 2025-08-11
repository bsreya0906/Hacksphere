import { useState } from "react"

const TEAMS = [
  { id: "t1", name: "Neon Nova" },
  { id: "t2", name: "Pixel Pulse" },
  { id: "t3", name: "Quantum Quokka" },
]

const RUBRIC = [
  { id: "innovation", label: "Innovation", max: 10 },
  { id: "impact", label: "Impact", max: 10 },
  { id: "execution", label: "Execution", max: 10 },
]

export default function SubmitScore() {
  const [teamId, setTeamId] = useState(TEAMS[0].id)
  const [scores, setScores] = useState({})
  const [note, setNote] = useState("")
  const [msg, setMsg] = useState(null)

  const setValue = (id, v) => setScores((s) => ({ ...s, [id]: Math.max(0, Number(v) || 0) }))

  const submit = async (e) => {
    e.preventDefault()
    for (const c of RUBRIC) {
      const v = scores[c.id]
      if (v == null || v > c.max) {
        setMsg({ type: "error", text: `Please provide ${c.label} (0-${c.max}).` })
        return
      }
    }
    // TODO: POST /scores { teamId, scores, note }
    setMsg({ type: "success", text: "Score submitted. Thank you!" })
    setScores({})
    setNote("")
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Submit Score</h1>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <select
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        >
          {TEAMS.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {RUBRIC.map((c) => (
          <div key={c.id}>
            <label className="block text-sm mb-1">{c.label} / {c.max}</label>
            <input
              type="number"
              min={0}
              max={c.max}
              value={scores[c.id] ?? ""}
              onChange={(e) => setValue(c.id, e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15"
            />
          </div>
        ))}
        <textarea
          placeholder="Judge notes (optional)"
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15 min-h-[100px]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="px-6 py-3 rounded-md bg-pink-500 hover:bg-pink-400 font-semibold">Submit</button>
        {msg && (
          <div className={`text-sm ${msg.type === "success" ? "text-green-300" : "text-red-300"}`}>
            {msg.text}
          </div>
        )}
      </form>
    </section>
  )
}
