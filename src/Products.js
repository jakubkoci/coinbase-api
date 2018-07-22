// @flow
import React from 'react'

type ProductStats = {
  id: string,
  open: number,
  high: number,
  low: number,
  last: number,
  volume: number,
  volume_30day: number,
}

type Props = {}

type State = {
  stats: Array<ProductStats>,
}

const api: string = 'https://api-public.sandbox.pro.coinbase.com'

class Products extends React.Component<Props, State> {
  state: State = {
    stats: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      const products = await fetchProducts()
      const stats = []
      for (const product of products) {
        console.log(product)
        const productStats = await fetchProductStatistics(product)
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

function ProductList({ stats }: State) {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Last</th>
          <th>Volume</th>
          <th>30 day volume</th>
        </tr>
      </thead>
      <tbody>
        {stats.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.open}</td>
            <td>{product.high}</td>
            <td>{product.low}</td>
            <td>{product.last}</td>
            <td>{product.volume}</td>
            <td>{product.volume_30day}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

async function fetchProducts() {
  const response = await fetch(`${api}/products`)
  return response.json()
}

async function fetchProductStatistics(product) {
  const response = await fetch(`${api}/products/${product.id}/stats`)
  const responseJson = await response.json()
  const productStats = { id: product.id, ...responseJson }
  return productStats
}

export default Products
