import { useState } from "react"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", skills: "", interests: "" })
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      setMsg({ type: "error", text: "Name and email are required." })
      return
    }
    // TODO: POST /participants
    // await fetch("/api/participants", { method: "POST", body: JSON.stringify(form) })
    setMsg({ type: "success", text: "Registered! Check your email for confirmation." })
    setForm({ name: "", email: "", skills: "", interests: "" })
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-pink-300 mb-6">Register Participant</h1>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <input
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />
        <textarea
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/15 min-h-[120px]"
          placeholder="Interests / Project ideas"
          value={form.interests}
          onChange={(e) => setForm({ ...form, interests: e.target.value })}
        />
        <button className="px-6 py-3 rounded-md bg-pink-500 hover:bg-pink-400 font-semibold">Register</button>
        {msg && (
          <div className={`text-sm ${msg.type === "success" ? "text-green-300" : "text-red-300"}`}>
            {msg.text}
          </div>
        )}
      </form>
    </section>
  )
}
