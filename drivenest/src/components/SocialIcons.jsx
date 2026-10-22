const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': 'true',
}

/** Brand glyphs, kept inline because lucide-react no longer ships brand icons. */
export const socialIcons = [
  {
    label: 'Facebook',
    Icon: (props) => (
      <svg {...base} {...props}>
        <path d="M13 22v-8h2.6l.4-3H13V9.2c0-.9.3-1.4 1.5-1.4H16V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.3-3.7 3.8V11H8v3h2v8z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    Icon: (props) => (
      <svg {...base} fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'X',
    Icon: (props) => (
      <svg {...base} {...props}>
        <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6zm-1 16h1.6L7.6 4.7H5.9z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    Icon: (props) => (
      <svg {...base} {...props}>
        <path d="M6.9 20H4V9h2.9zM5.4 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM20 20h-2.9v-5.3c0-1.3-.5-2.2-1.7-2.2-.9 0-1.4.6-1.7 1.3-.1.2-.1.5-.1.8V20H10.7s0-9.1 0-10h2.9v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.7 1.3 3.7 4.1z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    Icon: (props) => (
      <svg {...base} {...props}>
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" />
      </svg>
    ),
  },
]
