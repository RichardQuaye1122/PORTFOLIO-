import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials } from '../data'

const VISIBLE = 3

export default function Testimonials() {
  const [start, setStart] = useState(0)

  const move = (step) =>
    setStart((value) => (value + step + testimonials.length) % testimonials.length)

  const shown = Array.from(
    { length: VISIBLE },
    (_, index) => testimonials[(start + index) % testimonials.length],
  )

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold">What Our Customers Say</h2>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonials"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-blue-600 sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <ul className="grid flex-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.location}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonials"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-blue-600 sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
