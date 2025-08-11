import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Leaderboard from "./pages/Leaderboard"
import Judges from "./pages/Judges"
import Scoring from "./pages/Scoring"
import Register from "./pages/Register"
import SubmitScore from "./pages/SubmitScore"

export default function App() {
  return (
    <div className="min-h-screen bg-hero text-white">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/judges" element={<Judges />} />
          <Route path="/scoring" element={<Scoring />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit-score" element={<SubmitScore />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
