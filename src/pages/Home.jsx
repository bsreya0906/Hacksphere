import { useState } from "react"
import FeatureCard from "../components/FeatureCard"
import Modal from "../components/Modal"

function IconSpark() {
  return <span className="text-pink-300 text-2xl">✦</span>
}

export default function Home() {
  const [open, setOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [tab, setTab] = useState("participants")
  const [faqs, setFaqs] = useState([false, false, false])

  const features = [
    {
      title: "AI Team Matchmaking",
      desc: "Connect by skills, goals, interests with LLM-powered recommendations.",
    },
    {
      title: "Real-Time Challenge Boards",
      desc: "Always-on updates for challenges, submissions, and announcements.",
    },
    {
      title: "Interactive Judging",
      desc: "Live rubrics, feedback, and instant analytics for fairness.",
    },
    {
      title: "Innovation Heatmaps",
      desc: "Visual insights on collaboration and mentor hotspots.",
    },
  ]

  const openFeature = (f) => {
    setActiveFeature(f)
    setOpen(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-[1200px] h-[1200px] bg-pink-500/20 rounded-full blur-3xl -top-1/2 -left-1/3 absolute" />
          <div className="w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-3xl -bottom-1/2 -right-1/3 absolute" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">
            Hackathons. Reinvented.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-white/85">
            A creative arena in the cloud: AI matchmaking, real-time challenges, idea refinement, and data-driven judging—all in one place.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <a href="/register" className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-400 font-semibold shadow-lg shadow-pink-500/30 transition">
              Register Now
            </a>
            <a href="/leaderboard" className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 font-semibold transition">
              View Leaderboard
            </a>
          </div>
          {/* Hero images carousel (simple) */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <img src="/src/media/hero1.jpg" alt="Hack team" className="rounded-2xl border border-white/10 object-cover h-56 w-full" />
            <img src="/src/media/teams.jpg" alt="Collaborate" className="rounded-2xl border border-white/10 object-cover h-56 w-full" />
            <img src="/src/media/hero2.jpg" alt="Judging" className="rounded-2xl border border-white/10 object-cover h-56 w-full" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-pink-300 mb-12">Game-Changing Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <FeatureCard
                key={f.title}
                title={f.title}
                desc={f.desc}
                icon={<IconSpark />}
                onClick={() => openFeature(f)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Audience tabs */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-3 justify-center mb-6">
            {["participants", "organizers", "judges"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                  tab === t ? "bg-pink-500 border-pink-400" : "bg-white/5 border-white/15 hover:bg-white/10"
                }`}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="card p-8">
            {tab === "participants" && (
              <ul className="grid sm:grid-cols-2 gap-4 list-disc pl-5">
                <li>One-click team formation</li>
                <li>Built-in idea refinement canvas</li>
                <li>Live announcements and challenge sync</li>
                <li>Submission flow with validation</li>
              </ul>
            )}
            {tab === "organizers" && (
              <ul className="grid sm:grid-cols-2 gap-4 list-disc pl-5">
                <li>Challenge board management</li>
                <li>Live progress and innovation heatmaps</li>
                <li>Mentor recommendations and routing</li>
                <li>Analytics dashboards and fairness checks</li>
              </ul>
            )}
            {tab === "judges" && (
              <ul className="grid sm:grid-cols-2 gap-4 list-disc pl-5">
                <li>Interactive rubric scoring</li>
                <li>Real-time tie-break recommendations</li>
                <li>Commenting and feedback exports</li>
                <li>Blind mode to reduce bias</li>
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="py-16 bg-black/30 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-pink-300 mb-6">FAQ</h3>
          {[
            "How do teams get matched?",
            "Can judges score offline?",
            "How do I integrate my backend?",
          ].map((q, i) => (
            <div key={q} className="mb-3 card p-5">
              <button
                className="w-full text-left flex justify-between items-center"
                onClick={() => setFaqs((s) => s.map((v, idx) => (idx === i ? !v : v)))}
              >
                <span className="font-semibold">{q}</span>
                <span className="text-pink-300">{faqs[i] ? "–" : "+"}</span>
              </button>
              {faqs[i] && (
                <p className="mt-3 text-white/80 text-sm">
                  We use a skills/interests profile plus constraints to suggest matches; swap with your API later.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature modal */}
      <Modal open={open} title={activeFeature?.title} onClose={() => setOpen(false)}>
        <p className="text-white/80">{activeFeature?.desc}</p>
        <div className="mt-4 flex gap-3">
          <a href="/register" className="px-4 py-2 rounded-md bg-pink-500 hover:bg-pink-400 font-semibold">Try It</a>
          <a href="/scoring" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/15">Learn More</a>
        </div>
      </Modal>
    </>
  )
}
