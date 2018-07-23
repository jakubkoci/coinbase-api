// @flow
import React, { Component } from 'react'
import ProductsStats from './ProductsStats'
import logo from './logo.svg'
import './App.css'

type Props = {}

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Coinbase API - 24hr Stats</h1>
        </header>
        <ProductsStats />
      </div>
    )
  }
}

export default App
