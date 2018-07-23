// @flow
import React from 'react'
import ProductList from './ProductList'
import type { Product24HrStatsType } from '../types'
import { fetchData } from '../data'

type Props = {}

type State = {
  stats: Array<Product24HrStatsType>,
}

class ProductsStats extends React.Component<Props, State> {
  mounted = false

  state = {
    stats: [],
  }

  componentDidMount(): void {
    this.mounted = true
    this.fetchData()
  }

  fetchData = async (): Promise<void> => {
    try {
      const stats = await fetchData()
      if (this.mounted) {
        this.setState({ stats })
      }
    } catch (error) {
      console.error(error)
    }
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  render() {
    console.log('render', this.state)
    return <ProductList stats={this.state.stats} />
  }
}

export default ProductsStats
