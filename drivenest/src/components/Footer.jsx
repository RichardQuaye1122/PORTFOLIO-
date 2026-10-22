import Logo from './Logo'
import { socialIcons } from './SocialIcons'
import { footerColumns } from '../data'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-400">
              Your trusted partner in finding the perfect car. Quality vehicles, best
              prices, and exceptional service.
            </p>
            <ul className="mt-5 flex gap-3">
              {socialIcons.map(({ Icon, label }) => (
                <li key={label}>
                  <a
                    href="#top"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-blue-600"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-xs text-slate-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 py-5">
        <p className="text-center text-xs text-slate-500">
          &copy; 2024 DriveNest. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
