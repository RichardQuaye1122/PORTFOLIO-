const TONES = {
  slate: '#475569',
  light: '#e2e8f0',
  red: '#dc2626',
  dark: '#1e293b',
  blue: '#2563eb',
}

const BODIES = {
  sedan:
    'M8 64c0-10 6-16 18-19l34-8c16-11 34-15 52-15h20c18 0 32 5 44 16l22 6c10 3 14 8 14 16v6c0 3-2 4-5 4H13c-3 0-5-2-5-5z',
  suv:
    'M10 62c0-10 6-16 18-19l30-13c12-8 28-12 46-12h32c18 0 32 6 44 16l20 8c8 3 12 8 12 16v6c0 3-2 4-5 4H15c-3 0-5-2-5-5z',
}

/**
 * Lightweight placeholder artwork so the UI renders without external images.
 * Swap for a real <img> once photography is available.
 */
export default function CarArt({ body = 'sedan', tone = 'slate', className = '' }) {
  const fill = TONES[tone] ?? TONES.slate

  return (
    <svg viewBox="0 0 220 90" className={className} role="presentation" aria-hidden="true">
      <ellipse cx="110" cy="82" rx="96" ry="5" fill="#0f172a" opacity="0.12" />
      <path d={BODIES[body] ?? BODIES.sedan} fill={fill} />
      <path
        d="M66 42 86 28c10-4 20-5 28-5v19zm52-19h18c14 1 24 6 34 16l-52 3z"
        fill="#0f172a"
        opacity="0.35"
      />
      {[58, 164].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="68" r="14" fill="#0f172a" />
          <circle cx={cx} cy="68" r="6" fill="#94a3b8" />
        </g>
      ))}
    </svg>
  )
}
