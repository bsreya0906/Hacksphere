import { useMemo, useState } from "react"

const ALL_SKILLS = [
  "AI",
  "ML",
  "FinTech",
  "Health",
  "Design",
  "Data",
  "Cloud",
  "Security",
  "Web",
  "Mobile",
]

const INITIAL_JUDGES = [
  { id: 1, name: "Ava Singh", email: "ava@example.com", org: "TechU", expertise: ["AI", "ML"], available: true },
  { id: 2, name: "Liam Chen", email: "liam@example.com", org: "FinLab", expertise: ["FinTech", "Data"], available: false },
  { id: 3, name: "Noah Patel", email: "noah@example.com", org: "MediX", expertise: ["Health", "Design"], available: true },
]

export default function Judges() {
  const [list, setList] = useState(INITIAL_JUDGES)

  const [q, setQ] = useState("")
  const [availability, setAvailability] = useState("All")
  const [skillFilter, setSkillFilter] = useState("All")

  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    bio: "",
    expertise: [],
    available: true,
    passcode: "",
  })
  const [errors, setErrors] = useState({})
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const filtered = useMemo(() => {
    let d = [...list]
    if (q) {
      const qq = q.toLowerCase()
      d = d.filter(
        (j) =>
          j.name.toLowerCase().includes(qq) ||
          j.email.toLowerCase().includes(qq) ||
          (j.org || "").toLowerCase().includes(qq)
      )
    }
    if (availability !== "All") {
      d = d.filter((j) => (availability === "Available" ? j.available : !j.available))
    }
    if (skillFilter !== "All") {
      d = d.filter((j) => j.expertise?.includes(skillFilter))
    }
    return d
  }, [list, q, availability, skillFilter])

  const toggleAvailability = (id) =>
    setList((s) => s.map((j) => (j.id === id ? { ...j, available: !j.available } : j)))

  const toggleExpertise = (skill) =>
    setForm((f) => {
      const on = f.expertise.includes(skill)
      return { ...f, expertise: on ? f.expertise.filter((x) => x !== skill) : [...f.expertise, skill] }
    })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email"
    if (form.expertise.length === 0) e.expertise = "Select at least one expertise"
    if (form.passcode && form.passcode.length < 4) e.passcode = "Passcode must be 4+ chars"
    return e
  }

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length) return
    setSubmitting(true)
    try {
      const created = {
        id: Math.max(0, ...list.map((x) => x.id)) + 1,
        name: form.name.trim(),
        email: form.email.trim(),
        org: form.org.trim(),
        expertise: [...form.expertise],
        available: form.available,
      }
      setList((s) => [created, ...s])
      setMsg({ type: "success", text: "Judge registered successfully." })
      setForm({ name: "", email: "", org: "", bio: "", expertise: [], available: true, passcode: "" })
    } catch (err) {
      setMsg({ type: "error", text: "Failed to register judge. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Judges</h1>

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, or org…"
            className="px-4 py-2 rounded-md bg-[#1a1b22] border border-white/25 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
            aria-label="Search judges"
          />
          <Select value={availability} onChange={setAvailability}>
            <option>All</option>
            <option>Available</option>
            <option>Busy</option>
          </Select>
          <Select value={skillFilter} onChange={setSkillFilter}>
            <option>All</option>
            {ALL_SKILLS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>
        <div className="text-sm text-white/60">Total: {filtered.length}</div>
      </div>

      {/* Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Directory */}
        <div className="lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((j) => (
              <div key={j.id} className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{j.name}</h3>
                    <p className="text-white/70 text-sm">{j.org || "Independent"}</p>
                    <p className="text-white/60 text-xs mt-1">{j.email}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {j.expertise.map((x) => (
                        <span key={x} className="px-2 py-1 rounded-full text-xs bg-white/10 border border-white/15">
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${j.available ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                    {j.available ? "Available" : "Busy"}
                  </span>
                </div>

                <button
                  onClick={() => toggleAvailability(j.id)}
                  className="mt-4 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/15"
                >
                  Toggle Availability
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-6 text-white/70">No judges match your filters.</div>
          )}
        </div>

        {/* Judge Registration */}
        <aside className="card p-6 h-max lg:sticky lg:top-24">
          <h2 className="text-xl font-semibold text-pink-300">Register a Judge</h2>
          <p className="text-white/70 text-sm mt-1">Add new judges with expertise and availability.</p>

          <form onSubmit={submit} className="mt-4 space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm mb-1">Name</label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.name ? "border-red-400" : "border-white/15"} text-white`}
                placeholder="Full name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.email ? "border-red-400" : "border-white/15"} text-white`}
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="org" className="block text-sm mb-1">Organization (optional)</label>
              <input
                id="org"
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15 text-white"
                placeholder="Company / Institution"
              />
            </div>

            <div>
              <span className="block text-sm mb-2">Expertise</span>
              <div className="flex flex-wrap gap-2">
                {ALL_SKILLS.map((s) => {
                  const active = form.expertise.includes(s)
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleExpertise(s)}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        active
                          ? "bg-pink-500/20 border-pink-400 text-pink-200"
                          : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                      }`}
                      aria-pressed={active}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
              {errors.expertise && <p className="text-red-300 text-xs mt-1">{errors.expertise}</p>}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm mb-1">Bio (optional)</label>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15 min-h-[90px] text-white"
                placeholder="Short bio or judging focus"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm">Available to judge</label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, available: !f.available }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${form.available ? "bg-green-500/60" : "bg-white/20"}`}
                aria-pressed={form.available}
                aria-label="Toggle availability"
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${form.available ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            <div>
              <label htmlFor="passcode" className="block text-sm mb-1">Judge passcode (optional)</label>
              <input
                id="passcode"
                value={form.passcode}
                onChange={(e) => setForm({ ...form, passcode: e.target.value })}
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.passcode ? "border-red-400" : "border-white/15"} text-white`}
                placeholder="If organizer requires a code"
              />
              {errors.passcode && <p className="text-red-300 text-xs mt-1">{errors.passcode}</p>}
            </div>

            <button
              disabled={submitting}
              className="w-full px-4 py-3 rounded-md bg-pink-500 hover:bg-pink-400 font-semibold disabled:opacity-60"
            >
              {submitting ? "Registering…" : "Register Judge"}
            </button>

            {msg && (
              <div className={`text-sm ${msg.type === "success" ? "text-green-300" : "text-red-300"}`}>
                {msg.text}
              </div>
            )}

            <p className="text-xs text-white/50">
              Your info is used for judge coordination and display to participants.
            </p>
          </form>
        </aside>
      </div>
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
