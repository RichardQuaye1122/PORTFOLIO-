import { Clock, CreditCard, Lock, ShieldCheck, Tag } from 'lucide-react'
import { benefits } from '../data'

const ICONS = {
  shield: ShieldCheck,
  tag: Tag,
  lock: Lock,
  card: CreditCard,
  clock: Clock,
}

export default function WhyBuy() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold">Why Buy With DriveNest?</h2>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {benefits.map((benefit) => {
          const Icon = ICONS[benefit.icon]
          return (
            <li key={benefit.title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{benefit.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {benefit.text}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
