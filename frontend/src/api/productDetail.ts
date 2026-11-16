import { API_URL } from '@/constants'
import type { ProductDetailResult } from '@/types/ProductDetail'

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

export async function fetchProductDetail(feedId: string, identifier: string): Promise<ProductDetailResult> {
  const res = await fetch(`${API_URL}/product-detail/${feedId}/${encodeURIComponent(identifier)}`)
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string; message?: string }
    throw new ApiError(err.error ?? err.message ?? `HTTP ${res.status}`, res.status)
  }
  return res.json() as Promise<ProductDetailResult>
}
