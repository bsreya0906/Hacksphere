export default function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-w-xl mx-auto mt-24 bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-pink-300">{title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
