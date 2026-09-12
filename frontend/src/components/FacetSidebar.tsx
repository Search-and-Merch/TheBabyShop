import { useState } from 'react'
import type { FacetResult } from '../types/ProductList'

interface Props {
  facets: FacetResult[]
  selected: Record<string, string[]>
  onChange: (facetSlug: string, value: string, checked: boolean) => void
}

export default function FacetSidebar({ facets, selected, onChange }: Props) {
  const [open, setOpen] = useState(false)

  if (facets.length === 0) return null

  return (
    <aside className="w-full sm:max-w-[200px] sticky top-16 max-h-[calc(100vh-4rem)] flex flex-col bg-white">
      <button
        className="flex w-full items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:pointer-events-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Filter
        <svg
          className={`w-4 h-4 transition-transform sm:hidden ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`space-y-6 overflow-y-auto scrollbar-hide ${open ? 'block' : 'hidden'} sm:block`}>
        {facets.map((facet) => (
          <div key={facet.slug}>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{facet.name}</h3>
            <ul className="space-y-1.5 max-sm:pr-5">
              {facet.values.map((v) => {
                const isChecked = (selected[facet.slug] ?? []).includes(v.value)
                return (
                  <li key={v.value}>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onChange(facet.slug, v.value, e.target.checked)}
                        className="rounded border-gray-300 text-pink-500 focus:ring-pink-400"
                      />
                      <span className="flex-1 truncate">{v.value}</span>
                      <span className="text-gray-400 text-xs">{v.count}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
