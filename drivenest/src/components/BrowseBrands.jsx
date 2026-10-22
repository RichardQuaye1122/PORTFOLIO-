import { brands } from '../data'

export default function BrowseBrands() {
  return (
    <div className="rounded-2xl bg-slate-50 p-6 sm:p-8">
      <h2 className="text-xl font-bold">Browse by Brand</h2>

      <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
        {brands.map((brand) => (
          <li key={brand}>
            <a href="#listings" className="group flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-colors group-hover:border-blue-500 group-hover:text-blue-600">
                {brand.charAt(0)}
              </span>
              <span className="text-center text-[11px] text-slate-500">{brand}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
