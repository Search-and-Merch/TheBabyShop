export interface AddToBasketResult {
  sku: string
  quantity: number
  /** Items in the basket after adding. */
  basket_count: number
}

let basketCount = 0

/** Demo only: there's no basket service, so this resolves a successful response without a fetch. */
export async function addToBasket(sku: string, quantity = 1): Promise<AddToBasketResult> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  basketCount += quantity
  return { sku, quantity, basket_count: basketCount }
}
