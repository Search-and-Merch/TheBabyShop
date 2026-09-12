import { API_URL } from '../constants'
import type { FeedProductListResult, ProductListRequest } from '../types/ProductList'

export async function fetchProductList(req: ProductListRequest): Promise<FeedProductListResult> {
  const res = await fetch(`${API_URL}/product-list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<FeedProductListResult>
}
