const numeral = require('numeral')
const CoinCounter = require('./CoinCounter.js')

let validCurrency = 'gbp'
let validAmount = '£7.65'

describe('constructor validation', () => {
  test('should throw error on invalid currency', () => {
    expect(() => {
      new CoinCounter('usd', 100)
    }).toThrow('Invalid currency')
  })

  test('should throw error on invalid amount (NaN)', () => {
    expect(() => {
      new CoinCounter('gbp', '£')
    }).toThrow('Invalid amount')
  })

  test('should throw error on invalid amount (0.001)', () => {
    expect(() => {
      new CoinCounter('gbp', 0.001)
    }).toThrow('Invalid amount')
  })

  test('should initialise successfully with valid currency and amount', () => {
    let coinCounter = new CoinCounter(validCurrency, validAmount)
    expect(coinCounter._currency).toEqual(validCurrency)
    expect(coinCounter._units).toEqual(numeral(validAmount).value() * 100)
  })
})
