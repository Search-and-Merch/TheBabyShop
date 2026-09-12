export interface ScoredProduct {
  id: string
  sku: string
  score: number
  [key: string]: unknown
}

export interface ProductRecommendationResult {
  recommendation_id: string
  recommendation_name: string
  feed_id: string | null
  total_count: number
  filtered_count: number
  page: number
  limit: number
  total_pages: number
  products: ScoredProduct[]
}

export interface ProductRecommendationsRequest {
  organisationId: string
  recommendationId: string
  page: number
  limit: number
}
