import { API_URL } from '../constants'
import type { ProductRecommendationResult, ProductRecommendationsRequest } from '../types/ProductRecommendations'

export async function fetchProductRecommendations(
  req: ProductRecommendationsRequest
): Promise<ProductRecommendationResult> {
  const res = await fetch(`${API_URL}/product-recommendations/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<ProductRecommendationResult>
}
