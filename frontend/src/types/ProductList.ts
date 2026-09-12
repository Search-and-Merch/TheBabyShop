export interface FacetValue {
  value: string
  count: number
  selected: boolean
}

export interface FacetResult {
  slug: string
  name: string
  values: FacetValue[]
}

export interface FeedListProduct {
  id: string
  sku: string
  score: number
  [key: string]: unknown
}

export interface FeedProductListResult {
  feed_id: string
  recommendations_applied: number
  total_count: number
  filtered_count: number
  page: number
  limit: number
  total_pages: number
  products: FeedListProduct[]
  facets: FacetResult[]
}

export interface ProductListRequest {
  feedId: string
  organisationId: string
  page: number
  limit: number
  facets?: Record<string, string[]>
}
