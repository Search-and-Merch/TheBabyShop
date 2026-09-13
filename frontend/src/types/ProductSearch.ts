import type { FacetResult } from './ProductList'

export interface ProductSearchRequest {
  searchId: string
  organisationId: string
  query: string
  page?: number
  limit?: number
  facets?: Record<string, string[]>
}

export interface SearchProduct {
  id: string
  sku: string
  score: number
  [key: string]: unknown
}

export interface ProductSearchResult {
  search_id: string
  total_count: number
  page: number
  limit: number
  total_pages: number
  products: SearchProduct[]
  facets: FacetResult[]
}
