import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { fetchProductSearch } from '../api/productSearch'
import { ORGANISATION_ID, SEARCH_ID } from '../constants'
import type { SearchProduct } from '../types/ProductSearch'

function getStringField(product: SearchProduct, ...keys: string[]): string | undefined {
  for (const key of keys) {
    if (typeof product[key] === 'string') return product[key] as string
  }
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchProduct[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetchProductSearch({
          searchId: SEARCH_ID,
          organisationId: ORGANISATION_ID,
          query: query.trim(),
          page: 1,
          limit: 5,
        })
        setResults(res.products.slice(0, 5))
        setOpen(true)
      } catch {
        // silently swallow — typeahead failures shouldn't break the UI
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && query.trim()) {
      setOpen(false)
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  function handleResultClick(product: SearchProduct) {
    const name = getStringField(product, 'name', 'title') ?? product.sku
    setQuery(name)
    setOpen(false)
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search products…"
          className="w-56 rounded-full border border-pink-200 bg-white px-4 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
        />
        {loading && (
          <span className="absolute right-3 h-3.5 w-3.5 rounded-full border-2 border-pink-400 border-t-transparent animate-spin" />
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {results.map(product => {
            const name = getStringField(product, 'name', 'title') ?? product.sku
            const imageUrl = getStringField(product, 'image_url', 'image', 'image_link')
            const price = typeof product.price === 'number' || typeof product.price === 'string'
              ? Number(product.price)
              : null
            return (
              <li key={product.id}>
                <button
                  onMouseDown={e => { e.preventDefault(); handleResultClick(product) }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-pink-50 transition-colors"
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-pink-100 overflow-hidden flex items-center justify-center">
                    {imageUrl
                      ? <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
                      : <span className="text-xl">🧸</span>
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">{name}</p>
                    {price !== null && (
                      <p className="text-xs text-pink-600 font-semibold">£{price.toFixed(2)}</p>
                    )}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
