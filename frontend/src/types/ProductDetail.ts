export interface ProductDetailProduct {
  id: string
  sku: string
  [key: string]: unknown
}

export interface ProductDetailResult {
  feed_id: string
  product: ProductDetailProduct
}
