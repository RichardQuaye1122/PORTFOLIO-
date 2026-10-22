import { useState } from 'react'
import { Fuel, Gauge, Heart, MapPin, Settings2 } from 'lucide-react'
import CarArt from './CarArt'

export default function CarCard({ car }) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex h-40 items-center justify-center bg-slate-100">
        <CarArt body={car.body} tone={car.tone} className="w-4/5" />
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          aria-label={saved ? `Remove ${car.name} from saved` : `Save ${car.name}`}
          aria-pressed={saved}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Heart
            className={`h-4 w-4 ${saved ? 'fill-blue-600 text-blue-600' : 'text-slate-500'}`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold">{car.name}</h3>
        <p className="text-xs text-slate-500">{car.trim}</p>
        <p className="mt-2 text-lg font-bold text-blue-600">{car.price}</p>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
          <li className="flex items-center gap-1">
            <Gauge className="h-3 w-3" /> {car.mileage}
          </li>
          <li className="flex items-center gap-1">
            <Settings2 className="h-3 w-3" /> {car.transmission}
          </li>
          <li className="flex items-center gap-1">
            <Fuel className="h-3 w-3" /> {car.fuel}
          </li>
        </ul>

        <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin className="h-3 w-3" /> {car.location}
        </p>
      </div>
    </article>
  )
}
