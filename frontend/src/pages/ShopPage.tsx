import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { fetchProductList } from '../api/productList'
import FacetSidebar from '../components/FacetSidebar'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import { FEED_ID, ORGANISATION_ID } from '../constants'
import type { FacetResult, FeedListProduct } from '../types/ProductList'

const PAGE_SIZE = 12

function parseFacetsFromParams(params: URLSearchParams): Record<string, string[]> {
  const facets: Record<string, string[]> = {}
  params.forEach((value, key) => {
    if (key.startsWith('f_')) {
      const slug = key.slice(2)
      facets[slug] = value.split(',').filter(Boolean)
    }
  })
  return facets
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState<FeedListProduct[]>([])
  const [facets, setFacets] = useState<FacetResult[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [filteredCount, setFilteredCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ORGANISATION_ID || !FEED_ID) {
      setError('VITE_ORGANISATION_ID and VITE_FEED_ID must be set in .env')
      setLoading(false)
      return
    }

    const page = Number(searchParams.get('page') ?? 1)
    const selectedFacets = parseFacetsFromParams(searchParams)

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProductList({
      feedId: FEED_ID,
      organisationId: ORGANISATION_ID,
      page,
      limit: PAGE_SIZE,
      facets: Object.keys(selectedFacets).length ? selectedFacets : undefined,
    })
      .then((res) => {
        if (cancelled) return
        setProducts(res.products)
        setFacets(res.facets)
        setTotalPages(res.total_pages)
        setFilteredCount(res.filtered_count)
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [searchParams])

  const page = Number(searchParams.get('page') ?? 1)
  const selectedFacets = parseFacetsFromParams(searchParams)

  function handleFacetChange(slug: string, value: string, checked: boolean) {
    const next = new URLSearchParams(searchParams)
    const current = (selectedFacets[slug] ?? []).filter((v) => v !== value)
    if (checked) current.push(value)
    if (current.length) {
      next.set(`f_${slug}`, current.join(','))
    } else {
      next.delete(`f_${slug}`)
    }
    next.delete('page')
    setSearchParams(next)
  }

  function handlePageChange(p: number) {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(p))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        {loading ? (
          <div className="mt-1 h-5 w-24 bg-gray-100 rounded animate-pulse" />
        ) : !error && (
          <p className="text-sm text-gray-500 mt-1">{filteredCount} products</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      <div className="flex max-sm:flex-col gap-8 items-start">
        <FacetSidebar facets={facets} selected={selectedFacets} onChange={handleFacetChange} />

        <div className="flex-1 w-full">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 && !error ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-3">🔍</p>
              <p className="text-base">No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
