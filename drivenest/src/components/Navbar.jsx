import { useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { navLinks } from '../data'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link, index) => (
            <a
              key={link}
              href="#top"
              className={`text-sm transition-colors hover:text-blue-600 ${
                index === 0
                  ? 'border-b-2 border-blue-600 pb-1 font-medium text-blue-600'
                  : 'text-slate-600'
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            aria-label="Saved cars"
            className="text-slate-500 transition-colors hover:text-blue-600"
          >
            <Heart className="h-5 w-5" />
          </button>
          <a href="#top" className="text-sm text-slate-600 hover:text-blue-600">
            Sign In
          </a>
          <a
            href="#top"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            List Your Car
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="text-slate-700 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#top"
                  onClick={() => setOpen(false)}
                  className="block text-sm text-slate-700 hover:text-blue-600"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
            <a href="#top" className="text-sm text-slate-600 hover:text-blue-600">
              Sign In
            </a>
            <a
              href="#top"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              List Your Car
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
