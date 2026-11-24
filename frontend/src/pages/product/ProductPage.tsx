import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ApiError, fetchProductDetail } from '@/api/productDetail'
import AddToBasketButton from '@/components/AddToBasketButton'
import RecommendationWidget from '@/components/RecommendationWidget'
import ReviewStars from '@/components/ReviewStars'
import { FEED_ID } from '@/constants'
import { track } from '@/tracking'
import type { ProductDetailProduct } from '@/types/ProductDetail'

function getStringField(product: ProductDetailProduct, ...keys: string[]): string | undefined {
  for (const key of keys) {
    if (typeof product[key] === 'string') return product[key] as string
  }
}

function getNumberField(product: ProductDetailProduct, key: string): number | null {
  const value = product[key]
  if (typeof value === 'number') return value
  if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) return Number(value)
  return null
}

function ProductDetails({ product }: { product: ProductDetailProduct }) {
  const name = getStringField(product, 'name', 'title') ?? product.sku
  const imageUrl = getStringField(product, 'image_url', 'image', 'image_link')
  const category = getStringField(product, 'category')
  const description = getStringField(product, 'description')
  const price = getNumberField(product, 'price')
  const rating = getNumberField(product, 'rating')
  const inStock = typeof product.in_stock === 'boolean' ? product.in_stock : null

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="bg-blue-100 rounded-lg overflow-hidden flex items-center justify-center aspect-square">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="aspect-square w-full object-cover" />
        ) : (
          <span className="text-8xl">🧸</span>
        )}
      </div>

      <div>
        <nav className="text-sm text-gray-400 mb-4">
          <Link to="/" className="hover:text-cyan-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-cyan-700">Shop</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link
                to={`/shop?f_category=${encodeURIComponent(category)}`}
                className="hover:text-cyan-700"
              >
                {category}
              </Link>
            </>
          )}
        </nav>

        <h1 className="text-3xl font-bold text-gray-800 leading-tight">{name}</h1>
        <p className="text-xs text-gray-400 font-mono mt-2">{product.sku}</p>

        {rating !== null && (
          <ReviewStars rating={rating} size="md" className="mt-3" />
        )}

        <div className="mt-6 flex items-center gap-4">
          {price !== null && (
            <span className="text-3xl font-bold text-cyan-800">£{price.toFixed(2)}</span>
          )}
          {inStock !== null && (
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {inStock ? 'In stock' : 'Out of stock'}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-6 text-gray-600 leading-relaxed">{description}</p>
        )}

        <AddToBasketButton
          sku={product.sku}
          productId={product.id}
          price={price}
          disabled={inStock === false}
          className="mt-8"
        />
      </div>
    </div>
  )
}

export default function ProductPage() {
  const { slug = '' } = useParams()

  const [product, setProduct] = useState<ProductDetailProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!FEED_ID) {
      setError('VITE_FEED_ID must be set in .env')
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setNotFound(false)

    fetchProductDetail(FEED_ID, slug)
      .then((res) => {
        if (cancelled) return
        setProduct(res.product)
        console.log('view product call');
        track('view_product', {
          feed_id: res.feed_id,
          product_id: res.product.id,
          sku: res.product.sku,
        })
      })
      .catch((e: Error) => {
        if (cancelled) return
        setProduct(null)
        if (e instanceof ApiError && e.status === 404) setNotFound(true)
        else setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <div>
      <section className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="grid gap-10 md:grid-cols-2">
            <div className="bg-gray-100 rounded-lg aspect-square animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-28 bg-gray-100 rounded animate-pulse" />
              <div className="h-20 w-full bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ) : notFound ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">🧸</p>
            <p className="text-base mb-4">Product not found.</p>
            <Link to="/shop" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Back to the shop →
            </Link>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        ) : product && (
          <ProductDetails product={product} />
        )}
      </section>

      <RecommendationWidget />
    </div>
  )
}
