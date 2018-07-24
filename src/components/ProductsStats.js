// @flow
import React from 'react'
import ProductList from './ProductList'
import type { Product24HrStatsType } from '../types'
import { fetchData } from '../data'

type Props = {}

type State = {|
  stats: Array<Product24HrStatsType>,
  loading: boolean,
  error: ?string,
|}

class ProductsStats extends React.Component<Props, State> {
  mounted = false

  state = {
    stats: [],
    loading: false,
    error: null,
  }

  componentDidMount(): void {
    this.mounted = true
    this.fetchData()
  }

  fetchData = async (): Promise<void> => {
    this.setState({ loading: true })
    try {
      const stats = await fetchData(stats => this.setState({ stats }))
      if (this.mounted) {
        this.setState({ loading: false, stats })
      }
    } catch (error) {
      console.error(error)
      this.setState({ loading: false, error: error.message })
    }
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  render() {
    console.log('render', this.state)
    const { stats, loading, error } = this.state

    return [
      <ProductList key="productList" stats={stats} />,
      <StatusBar key="statusBar" loading={loading} error={error} />,
    ]
  }
}

function StatusBar({ loading, error }) {
  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>{error}</div>
  }

  return null
}

export default ProductsStats
