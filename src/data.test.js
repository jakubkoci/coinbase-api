import fetchMock from 'fetch-mock'
import * as data from './data'

const API_URL: string = 'https://api-public.sandbox.pro.coinbase.com'

// 24Hr stats data by product ID
const mockData = {
  'ETH-BTC': {
    open: '0.07500000',
    high: '1.00000000',
    low: '0.05000000',
    volume: '427.13927243',
    last: '0.05000000',
    volume_30day: '25537.47078306',
  },
  'ETH-USD': {
    open: '465.20000000',
    high: '9900.00000000',
    low: '445.00000000',
    volume: '104.89313190',
    last: '459.58000000',
    volume_30day: '307167.14076305',
  },
  'LTC-BTC': { status: 404 },
}

describe('data', () => {
  describe('fetchData', () => {
    afterEach(() => fetchMock.restore())

    it('returns product stats for every productId', async () => {
      setUpMockResponses(mockData, ['ETH-BTC', 'ETH-USD'])

      const result = await data.fetchData()

      expect(result).toEqual([{ id: 'ETH-BTC', ...mockData['ETH-BTC'] }, { id: 'ETH-USD', ...mockData['ETH-USD'] }])
    })

    it('throws error when product api returns error', async done => {
      fetchMock.get(`${API_URL}/products`, { status: 404 })

      try {
        await data.fetchData()
        done.fail()
      } catch (error) {
        expect(error).toEqual(new Error('Request to fetch products has failed.'))
        done()
      }
    })

    it('throws error when stats for given product returns error', async done => {
      setUpMockResponses(mockData, ['ETH-BTC', 'ETH-USD', 'LTC-BTC'])

      try {
        await data.fetchData()
        done.fail('No exception has been thrown!')
      } catch (error) {
        expect(error).toEqual(new Error('Request to fetch product stats has failed.'))
        done()
      }
    })
  })
})

/**
 * Set reponses only for keys defined by mockProductIds array
 */
function setUpMockResponses(mockData, mockProductIds) {
  fetchMock.get(`${API_URL}/products`, mockProductIds.map(mockProductId => ({ id: mockProductId })))

  mockProductIds.forEach(productId => {
    fetchMock.get(`${API_URL}/products/${productId}/stats`, mockData[productId])
  })
}
