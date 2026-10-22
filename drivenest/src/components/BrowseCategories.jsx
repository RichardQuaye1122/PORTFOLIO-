import { Car, Caravan, CarFront, CarTaxiFront, Truck } from 'lucide-react'
import { categories } from '../data'

const ICONS = [Car, CarFront, Truck, CarTaxiFront, Caravan, Car]

export default function BrowseCategories() {
  return (
    <div className="rounded-2xl bg-blue-600 p-6 text-white sm:p-8">
      <h2 className="text-xl font-bold">Browse by Category</h2>

      <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {categories.map((category, index) => {
          const Icon = ICONS[index]
          return (
            <li key={category}>
              <a href="#listings" className="group flex flex-col items-center gap-2">
                <Icon className="h-7 w-7 text-blue-100 transition-colors group-hover:text-white" />
                <span className="text-center text-[11px] text-blue-50">{category}</span>
              </a>
            </li>
          )
        })}
      </ul>

      <div className="mt-6 flex justify-center">
        <a
          href="#listings"
          className="rounded-lg bg-white/15 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/25"
        >
          View All Categories
        </a>
      </div>
    </div>
  )
}
