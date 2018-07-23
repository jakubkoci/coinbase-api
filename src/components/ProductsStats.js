// @flow
import React from 'react'
import ProductList from './ProductList'
import type { ProductType, Product24HrStatsType } from '../types'
import { fetchProducts, fetchProduct24HrStats } from '../data'

type Props = {}

type State = {
  stats: Array<Product24HrStatsType>,
}

class ProductsStats extends React.Component<Props, State> {
  state = {
    stats: [],
  }

  componentDidMount(): void {
    this.fetchData()
  }

  fetchData = async (): Promise<void> => {
    try {
      const products: Array<ProductType> = await fetchProducts()
      const stats: Array<Product24HrStatsType> = []

      for (const product of products) {
        console.log(product)
        const productStats = await fetchProduct24HrStats(product)
        stats.push(productStats)
        this.setState({ stats: [...stats] })
      }
    } catch (error) {
      console.error('Fetch data error', error)
    }
  }

  render() {
    console.log('render', this.state)
    return <ProductList stats={this.state.stats} />
  }
}

export default ProductsStats
