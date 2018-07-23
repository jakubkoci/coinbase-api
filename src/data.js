// @flow
import type { ProductType } from './types'

// const API_URL: string = 'https://api-public.sandbox.pro.coinbase.com'
const API_URL: string = 'https://api-public.sandbox.pro.coinbase.com'

export async function fetchProducts(): Promise<Array<ProductType>> {
  const response = await fetch(`${API_URL}/products`)
  // TODO Handle response status
  return response.json()
}

export async function fetchProduct24HrStats(product: ProductType) {
  const response = await fetch(`${API_URL}/products/${product.id}/stats`)
  const responseJson = await response.json()
  // TODO Handle response status
  const productStats = { id: product.id, ...responseJson }
  return productStats
}
