import CarArt from './CarArt'

export default function FinancingBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl bg-blue-600 text-white lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-xs font-semibold tracking-widest text-blue-100 uppercase">
            Financing Made Simple
          </p>
          <h2 className="mt-3 text-3xl font-bold">Get Behind the Wheel Today</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-50">
            Choose from flexible financing options with competitive rates. Pre-qualify in
            minutes and drive home your perfect car.
          </p>
          <a
            href="#top"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            Get Pre-Approved
          </a>
        </div>

        <div className="relative hidden items-center justify-center bg-blue-700/40 p-12 lg:flex">
          <CarArt body="suv" tone="light" className="w-4/5" />
        </div>
      </div>
    </section>
  )
}
