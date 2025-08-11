import { useMemo, useState } from "react"

// Static skills used by the Expertise filter and the registration form.
// Keeping this constant ensures the dropdown never renders empty.
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

// Demo seed so the directory isn’t empty on first load.
// Replace with GET /api/judges later.
const INITIAL_JUDGES = [
  { id: 1, name: "Ava Singh", email: "ava@example.com", org: "TechU", expertise: ["AI", "ML"], available: true },
  { id: 2, name: "Liam Chen", email: "liam@example.com", org: "FinLab", expertise: ["FinTech", "Data"], available: false },
  { id: 3, name: "Noah Patel", email: "noah@example.com", org: "MediX", expertise: ["Health", "Design"], available: true },
]

export default function Judges() {
  // Directory data
  const [list, setList] = useState(INITIAL_JUDGES)

  // Filters
  const [q, setQ] = useState("")
  const [availability, setAvailability] = useState("All") // "All" | "Available" | "Busy"
  const [skillFilter, setSkillFilter] = useState("All")   // "All" | any from ALL_SKILLS

  // Registration form state
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

  // Derived: filtered judges for display
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

  // Toggle availability on a judge card
  const toggleAvailability = (id) =>
    setList((s) => s.map((j) => (j.id === id ? { ...j, available: !j.available } : j)))

  // Registration helpers
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
      // TODO: replace with real POST /api/judges
      // const res = await fetch("/api/judges", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      // const created = await res.json()

      // Local optimistic create (demo)
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

      {/* Filter Bar */}
      <div className="card p-4 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, or org…"
            className="px-4 py-2 rounded-md bg-white/10 border border-white/15"
            aria-label="Search judges"
          />
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="px-4 py-2 rounded-md bg-white/10 border border-white/15"
            aria-label="Filter by availability"
          >
            <option>All</option>
            <option>Available</option>
            <option>Busy</option>
          </select>
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-4 py-2 rounded-md bg-white/10 border border-white/15"
            aria-label="Filter by expertise"
          >
            <option>All</option>
            {ALL_SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-white/60">Total: {filtered.length}</div>
      </div>

      {/* Grid: Directory + Registration */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Directory (2 columns on desktop) */}
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
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                      j.available ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
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
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm mb-1">
                Name
              </label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${
                  errors.name ? "border-red-400" : "border-white/15"
                }`}
                placeholder="Full name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${
                  errors.email ? "border-red-400" : "border-white/15"
                }`}
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Organization */}
            <div className="grid grid-cols-1">
              <label htmlFor="org" className="block text-sm mb-1">
                Organization (optional)
              </label>
              <input
                id="org"
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15"
                placeholder="Company / Institution"
              />
            </div>

            {/* Expertise chips */}
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

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm mb-1">
                Bio (optional)
              </label>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15 min-h-[90px]"
                placeholder="Short bio or judging focus"
              />
            </div>

            {/* Availability switch */}
            <div className="flex items-center justify-between">
              <label className="text-sm">Available to judge</label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, available: !f.available }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  form.available ? "bg-green-500/60" : "bg-white/20"
                }`}
                aria-pressed={form.available}
                aria-label="Toggle availability"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                    form.available ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Passcode */}
            <div>
              <label htmlFor="passcode" className="block text-sm mb-1">
                Judge passcode (optional)
              </label>
              <input
                id="passcode"
                value={form.passcode}
                onChange={(e) => setForm({ ...form, passcode: e.target.value })}
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${
                  errors.passcode ? "border-red-400" : "border-white/15"
                }`}
                placeholder="If organizer requires a code"
              />
              {errors.passcode && <p className="text-red-300 text-xs mt-1">{errors.passcode}</p>}
            </div>

            {/* Submit */}
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
