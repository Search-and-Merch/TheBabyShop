import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { fetchProductList } from '../api/productList'
import FacetSidebar from '../components/FacetSidebar'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import { FEED_ID, ORGANISATION_ID } from '../constants'
import type { FacetResult, FeedListProduct } from '../types/ProductList'

const PAGE_SIZE = 12
const CATEGORY_FACETS = { category: ['Pushchairs & Strollers'] }

function parseFacetsFromParams(params: URLSearchParams): Record<string, string[]> {
  const facets: Record<string, string[]> = {}
  params.forEach((value, key) => {
    if (key.startsWith('f_')) {
      const slug = key.slice(2)
      if (slug in CATEGORY_FACETS) return
      facets[slug] = value.split(',').filter(Boolean)
    }
  })
  return facets
}

const PUSHCHAIR_TYPES = [
  {
    title: 'Travel Systems',
    description: 'A pushchair, carrycot and car seat that work together, so you can move from car to pavement without waking a sleeping baby.',
    query: 'travel system',
  },
  {
    title: 'Lightweight Strollers',
    description: 'Compact, one-hand folds that slip into a boot or overhead locker. Ideal for city streets, public transport and holidays.',
    query: 'stroller',
  },
  {
    title: 'Double Pushchairs',
    description: 'Side-by-side or tandem designs for twins and siblings close in age, built to fit through standard doorways.',
    query: 'double pushchair',
  },
]

export default function PushchairsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const selectedFacets = parseFacetsFromParams(searchParams)

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
      facets: { ...selectedFacets, ...CATEGORY_FACETS },
    })
      .then((res) => {
        if (cancelled) return
        setProducts(res.products)
        setFacets(res.facets.filter((f) => !(f.slug in CATEGORY_FACETS)))
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
    document.getElementById('pushchair-products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-500 via-pink-200 to-yellow-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Pushchairs &amp; Prams
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Placeholder banner - from newborn carrycots to nimble city strollers, find the right ride for every stage.
          </p>
          <Link
            to={`/search?q=${encodeURIComponent('pushchair')}`}
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-sm"
          >
            Shop Pushchairs
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {PUSHCHAIR_TYPES.map(type => (
            <div key={type.title} className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
              <img className="w-16" src="https://images.searchandmerch.com/pram-placeholder.png" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{type.title}</h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{type.description}</p>
              <Link
                to={`/search?q=${encodeURIComponent(type.query)}`}
                className="text-sm font-semibold text-pink-600 hover:text-pink-700"
              >
                Browse {type.title.toLowerCase()} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="pushchair-products" className="container mx-auto px-4 pb-16 scroll-mt-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Pushchairs &amp; Strollers</h2>
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
                <p className="text-base">No pushchairs found. Try adjusting your filters.</p>
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
      </section>
    </div>
  )
}
