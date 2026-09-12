import { useEffect, useState } from 'react'
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
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl">🧸</span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 font-mono mb-0.5 truncate">{product.sku}</p>
        <h4 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{name}</h4>
      </div>
    </div>
  )
}

export default function RecommendationWidget() {
  const [products, setProducts] = useState<ScoredProduct[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        <div className="max-w-6xl mx-auto px-4">
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
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5">{title || 'You Might Like'}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((p, i) => (
            <RecommendedProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
