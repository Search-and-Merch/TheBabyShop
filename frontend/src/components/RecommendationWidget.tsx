import { useEffect, useRef, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { fetchProductRecommendations } from '../api/productRecommendations'
import { ORGANISATION_ID, RECOMMENDATION_ID } from '../constants'
import type { ScoredProduct } from '../types/ProductRecommendations'

const PLACEHOLDER_COLORS = ['bg-pink-100', 'bg-blue-100', 'bg-yellow-100', 'bg-green-100', 'bg-purple-100']

function getStringField(product: ScoredProduct, ...keys: string[]): string | undefined {
  for (const key of keys) {
    if (typeof product[key] === 'string') return product[key] as string
  }
}

function RecommendedProductCard({ product, index }: { product: ScoredProduct; index: number }) {
  const colorClass = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]
  const name = getStringField(product, 'name', 'title') ?? product.sku
  const imageUrl = getStringField(product, 'image_url', 'image', 'image_link')

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-[180px] max-w-[180px] hover:shadow-md transition-shadow shrink-0">
      <div className={`${colorClass} h-36 flex items-center justify-center overflow-hidden`}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="aspect-square w-full" />
        ) : (
          <span className="text-4xl">🧸</span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 font-mono mb-0.5 truncate">{product.sku}</p>
        <h4 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{name}</h4>
        {product.price != null && (
          <p className="text-xs font-semibold text-gray-900 mt-1">£{product.price.toFixed(2)}</p>
        )}
      </div>
    </div>
  )
}

export default function RecommendationWidget() {
  const [products, setProducts] = useState<ScoredProduct[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const nowAtStart = el.scrollLeft === 0
    const nowAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
    if (nowAtStart !== atStart) setAtStart(nowAtStart)
    if (nowAtEnd !== atEnd) setAtEnd(nowAtEnd)
  }

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!ORGANISATION_ID || !RECOMMENDATION_ID) {
      setLoading(false)
      return
    }
    fetchProductRecommendations({
      organisationId: ORGANISATION_ID,
      recommendationId: RECOMMENDATION_ID,
      page: 1,
      limit: 8,
    })
      .then((res) => {
        setProducts(res.products)
        setTitle(res.recommendation_name)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (!ORGANISATION_ID || !RECOMMENDATION_ID) return null

  if (loading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="h-6 w-40 bg-gray-100 rounded animate-pulse mb-5" />
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-52 min-w-[180px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || products.length === 0) return null

  return (
    <section className="py-10 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5">{title || 'You Might Like'}</h2>
        <div className="relative">
          {!atStart && (
            <button
              onClick={() => scrollBy(-220)}
              className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-gray-900 hover:shadow-lg transition-shadow hover:bg-gray-800 hover:text-white"
              aria-label="Scroll left"
            >
              <ArrowLeftIcon className="w-4.5 h-4.5" />
            </button>
          )}
          <div ref={scrollRef} onScroll={handleScroll} className="flex gap-4 overflow-x-auto pb-2">
            {products.map((p, i) => (
              <RecommendedProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          {!atEnd && (
            <button
              onClick={() => scrollBy(220)}
              className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-gray-900 hover:shadow-lg transition-shadow hover:bg-gray-800 hover:text-white"
              aria-label="Scroll right"
            >
              <ArrowRightIcon className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
