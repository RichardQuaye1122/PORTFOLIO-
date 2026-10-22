export default function Logo({ light = false }) {
  return (
    <a href="#top" className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#2563eb" />
        <path d="M9 20h14l-3-7H12z" fill="#fff" />
        <circle cx="13" cy="21" r="2" fill="#2563eb" />
        <circle cx="19" cy="21" r="2" fill="#2563eb" />
      </svg>
      <span className={`text-xl font-bold ${light ? 'text-white' : 'text-slate-900'}`}>
        Drive<span className={light ? 'text-white' : 'text-blue-600'}>Nest</span>
      </span>
    </a>
  )
}
