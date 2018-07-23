import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as data from '../data'

describe('<App />', () => {
  data.fetchData = jest.fn().mockReturnValue([])

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
