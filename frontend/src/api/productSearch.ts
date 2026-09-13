import { API_URL } from '../constants'
import type { ProductSearchRequest, ProductSearchResult } from '../types/ProductSearch'

export async function fetchProductSearch(req: ProductSearchRequest): Promise<ProductSearchResult> {
  const res = await fetch(`${API_URL}/product-search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<ProductSearchResult>
}
