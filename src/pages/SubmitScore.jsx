import { useEffect, useMemo, useState } from "react"

const TEAMS_DEMO = [
  { id: "t1", name: "Neon Nova" },
  { id: "t2", name: "Quantum Quokka" },
  { id: "t3", name: "Pixel Pulse" },
]

const RUBRIC_DEMO = [
  { key: "innovation", label: "Innovation", max: 25 },
  { key: "impact", label: "Impact", max: 25 },
  { key: "feasibility", label: "Feasibility", max: 25 },
  { key: "presentation", label: "Presentation", max: 25 },
]

export default function SubmitScore() {
  // Data
  const [teams, setTeams] = useState([])
  const [rubric, setRubric] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Form
  const [teamId, setTeamId] = useState("")
  const [judgeName, setJudgeName] = useState("")
  const [scores, setScores] = useState({})
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState({})
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Simulate fetch; swap with GET /api/teams and GET /api/rubric
    const t = setTimeout(() => {
      try {
        setTeams(TEAMS_DEMO)
        setRubric(RUBRIC_DEMO)
        setScores(Object.fromEntries(RUBRIC_DEMO.map(r => [r.key, ""])))
        setError(null)
      } catch {
        setError("Failed to load scoring data.")
      } finally {
        setLoading(false)
      }
    }, 150)
    return () => clearTimeout(t)
  }, [])

  const total = useMemo(() => {
    return (rubric || []).reduce((sum, r) => {
      const v = Number(scores[r.key])
      return sum + (isFinite(v) ? v : 0)
    }, 0)
  }, [scores, rubric])

  const maxTotal = useMemo(() => (rubric || []).reduce((s, r) => s + r.max, 0), [rubric])

  const setScore = (key, value) => {
    const rule = (rubric || []).find(r => r.key === key)
    if (value === "") return setScores(s => ({ ...s, [key]: "" }))
    let v = Number(value)
    if (!isFinite(v)) return
    if (rule) v = Math.max(0, Math.min(rule.max, v))
    setScores(s => ({ ...s, [key]: v }))
  }

  const validate = () => {
    const e = {}
    if (!teamId) e.teamId = "Select a team"
    if (!judgeName.trim()) e.judgeName = "Judge name is required"
    for (const r of rubric || []) {
      const val = scores[r.key]
      if (val === "" || !isFinite(Number(val))) e[r.key] = `Enter 0–${r.max}`
      else if (Number(val) < 0 || Number(val) > r.max) e[r.key] = `0–${r.max} only`
    }
    return e
  }

  const submit = async (evt) => {
    evt.preventDefault()
    setMsg(null)
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length) return
    setSubmitting(true)
    try {
      // Replace with POST /api/scores
      // await fetch("/api/scores", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ teamId, judgeName, scores, notes, total }) })
      await new Promise(res => setTimeout(res, 400))
      setMsg({ type: "success", text: "Score submitted successfully." })
      setTeamId("")
      setJudgeName("")
      setNotes("")
      setScores(Object.fromEntries((rubric || []).map(r => [r.key, ""])))
    } catch {
      setMsg({ type: "error", text: "Failed to submit. Try again." })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-pink-300 mb-6">Submit Score</h1>
        <div className="card p-6">Loading…</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-pink-300 mb-6">Submit Score</h1>
        <div className="card p-6 text-red-300">{error}</div>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Submit Score</h1>

      <form onSubmit={submit} className="card p-6 space-y-5" noValidate>
        {/* Team and Judge */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <label className="block text-sm mb-1">Team</label>
            <Select value={teamId} onChange={setTeamId}>
              <option value="">Select team…</option>
              {(teams || []).map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </Select>
            {errors.teamId && <p className="text-red-300 text-xs mt-1">{errors.teamId}</p>}
          </div>

          <div>
            <label htmlFor="judge" className="block text-sm mb-1">Judge name</label>
            <input
              id="judge"
              value={judgeName}
              onChange={(e) => setJudgeName(e.target.value)}
              className={`w-full px-4 py-3 rounded-md bg-[#1a1b22] border ${errors.judgeName ? "border-red-400" : "border-white/25"} text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400/60`}
              placeholder="Your name"
            />
            {errors.judgeName && <p className="text-red-300 text-xs mt-1">{errors.judgeName}</p>}
          </div>
        </div>

        {/* Rubric grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {(rubric || []).map((r) => (
            <div key={r.key}>
              <label htmlFor={r.key} className="block text-sm mb-1">
                {r.label} <span className="text-white/60 text-xs">(max {r.max})</span>
              </label>
              <input
                id={r.key}
                type="number"
                inputMode="numeric"
                min={0}
                max={r.max}
                value={scores[r.key]}
                onChange={(e) => setScore(r.key, e.target.value)}
                className={`w-full px-4 py-3 rounded-md bg-[#1a1b22] border ${errors[r.key] ? "border-red-400" : "border-white/25"} text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400/60`}
                placeholder={`0 – ${r.max}`}
              />
              {errors[r.key] && <p className="text-red-300 text-xs mt-1">{errors[r.key]}</p>}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm mb-1">Notes (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#1a1b22] border border-white/25 text-white min-h-[100px] placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
            placeholder="Feedback for the team"
          />
        </div>

        {/* Total and action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-white/90">
            Total: <span className="font-semibold">{total}</span> / {maxTotal}
          </div>
          <button
            disabled={submitting}
            className="px-5 py-3 rounded-md bg-pink-500 hover:bg-pink-400 font-semibold disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Score"}
          </button>
        </div>

        {msg && (
          <div className={`text-sm ${msg.type === "success" ? "text-green-300" : "text-red-300"}`}>
            {msg.text}
          </div>
        )}
      </form>
    </section>
  )
}

function Select({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pr-9 px-4 py-3 rounded-md bg-[#1a1b22] border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-pink-400/60 w-full"
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
