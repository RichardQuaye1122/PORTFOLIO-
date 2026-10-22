import { useState } from 'react'
import { Car, Search, SlidersHorizontal, Wallet } from 'lucide-react'
import { searchFilters, searchTabs } from '../data'

const TAB_ICONS = [Search, Car, Wallet, SlidersHorizontal]

export default function SearchPanel() {
  const [activeTab, setActiveTab] = useState(searchTabs[0])

  return (
    <section className="mx-auto -mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:p-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-5">
          {searchTabs.map((tab, index) => {
            const Icon = TAB_ICONS[index]
            const isActive = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab}
              </button>
            )
          })}
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
        >
          {searchFilters.map((filter) => (
            <label key={filter.label} className="block text-left">
              <span className="text-xs text-slate-500">{filter.label}</span>
              <select
                defaultValue={filter.options[0]}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {filter.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}

          <button
            type="submit"
            className="mt-auto rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Search Cars
          </button>
        </form>
      </div>
    </section>
  )
}
