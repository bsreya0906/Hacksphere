export default function FeatureCard({ title, desc, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card p-6 text-left w-full cursor-pointer"
      aria-label={title}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-pink-300">{title}</h3>
          <p className="text-white/80 text-sm mt-1">{desc}</p>
        </div>
      </div>
    </button>
  )
}
