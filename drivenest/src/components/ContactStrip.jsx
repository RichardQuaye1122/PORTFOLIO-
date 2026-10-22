import { Mail, MapPin, Phone } from 'lucide-react'
import { contactDetails } from '../data'

const ICONS = { phone: Phone, mail: Mail, pin: MapPin }

export default function ContactStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 border-t border-slate-100 pt-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="mt-2 text-sm text-slate-500">
            Have questions? Our team is here to help you find the perfect car.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-3">
          {contactDetails.map((detail) => {
            const Icon = ICONS[detail.icon]
            return (
              <li key={detail.title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{detail.title}</h3>
                  {detail.lines.map((line) => (
                    <p key={line} className="text-xs text-slate-500">
                      {line}
                    </p>
                  ))}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
