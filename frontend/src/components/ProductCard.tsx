import type { FeedListProduct } from '../types/ProductList'

const PLACEHOLDER_COLORS = [
  'bg-pink-100',
  'bg-blue-100',
  'bg-yellow-100',
  'bg-green-100',
  'bg-purple-100',
]

function getStringField(product: FeedListProduct, ...keys: string[]): string | undefined {
  for (const key of keys) {
    if (typeof product[key] === 'string') return product[key] as string
  }
}

interface Props {
  product: FeedListProduct
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const colorClass = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]
  const name = getStringField(product, 'name', 'title') ?? product.sku
  const price = typeof product.price === 'number' || typeof product.price === 'string'
    ? Number(product.price)
    : null
  const imageUrl = getStringField(product, 'image_url', 'image', 'image_link')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`${colorClass} flex items-center justify-center overflow-hidden`}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="aspect-square w-full" />
        ) : (
          <span className="text-5xl">🧸</span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 font-mono mb-1 truncate">{product.sku}</p>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{name}</h3>
        <div className="mt-3 flex items-center justify-between">
          {price !== null ? (
            <span className="font-bold">£{price.toFixed(2)}</span>
          ) : (
            <span />
          )}
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
            {product.score.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
