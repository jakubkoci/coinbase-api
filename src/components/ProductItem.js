// @flow
import React from 'react'
import type { Product24HrStatsType } from '../types'

type Props = {
  product: Product24HrStatsType,
}

export default function ProductItem({ product }: Props) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.open}</td>
      <td>{product.high}</td>
      <td>{product.low}</td>
      <td>{product.last}</td>
      <td>{product.volume}</td>
      <td>{product.volume_30day}</td>
    </tr>
  )
}
