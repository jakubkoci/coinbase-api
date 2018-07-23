// @flow
import React from 'react'
import ProductItem from './ProductItem'
import type { Product24HrStatsType } from '../types'

type Props = {
  stats: Array<Product24HrStatsType>,
}

export default function ProductList({ stats }: Props) {
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
      <tbody>{stats.map(product => <ProductItem key={product.id} product={product} />)}</tbody>
    </table>
  )
}
