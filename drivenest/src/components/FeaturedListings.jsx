import CarCard from './CarCard'
import { featuredCars } from '../data'

export default function FeaturedListings() {
  return (
    <section id="listings" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Featured Listings</h2>
        <a href="#listings" className="text-sm text-blue-600 hover:underline">
          View All Vehicles
        </a>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {featuredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  )
}
