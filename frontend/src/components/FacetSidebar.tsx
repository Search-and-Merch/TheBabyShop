import type { FacetResult } from '../types/ProductList'

interface Props {
  facets: FacetResult[]
  selected: Record<string, string[]>
  onChange: (facetSlug: string, value: string, checked: boolean) => void
}

export default function FacetSidebar({ facets, selected, onChange }: Props) {
  if (facets.length === 0) return null

  return (
    <aside className="w-full shrink-0 lg:max-w-[300px]">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Filter</h2>
      <div className="space-y-6">
        {facets.map((facet) => (
          <div key={facet.slug}>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{facet.name}</h3>
            <ul className="space-y-1.5">
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
                      <span className="text-gray-400 text-xs shrink-0">{v.count}</span>
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
