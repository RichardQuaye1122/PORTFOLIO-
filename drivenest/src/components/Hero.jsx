import { BadgeCheck, Car, Tag } from 'lucide-react'
import CarArt from './CarArt'
import { heroStats } from '../data'

const ICONS = { car: Car, badge: BadgeCheck, tag: Tag }

export default function Hero() {
  return (
    <section id="top" className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Find Your Perfect Car
            <br />
            Drive Your <span className="text-blue-600">Dreams</span>
          </h1>

          <p className="mt-6 max-w-md text-slate-600">
            Explore thousands of verified cars from trusted sellers. Best prices. Easy
            financing. Drive with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#listings"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Browse Cars
            </a>
            <a
              href="#top"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
            >
              Sell Your Car
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {heroStats.map((stat) => {
              const Icon = ICONS[stat.icon]
              return (
                <div key={stat.title} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm font-semibold">{stat.title}</dt>
                    <dd className="text-xs text-slate-500">{stat.text}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-x-6 top-10 h-48 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="relative flex items-end justify-center">
            <CarArt body="suv" tone="slate" className="w-2/5 -mr-8 opacity-90" />
            <CarArt body="sedan" tone="blue" className="z-10 w-3/5 drop-shadow-xl" />
            <CarArt body="sedan" tone="light" className="w-2/5 -ml-8 opacity-90" />
          </div>
        </div>
      </div>
    </section>
  )
}
