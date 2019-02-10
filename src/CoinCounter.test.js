const numeral = require('numeral');
const CoinCounter = require('./CoinCounter.js');

let validCurrency = 'gbp';
let validAmount = '£7.65';

describe('constructor validation', () => {
  test('should throw error on invalid currency', () => {
    expect(() => {
      new CoinCounter('usd', 100);
    }).toThrow('Invalid currency');
  });

  test('should throw error on invalid amount (NaN)', () => {
    expect(() => {
      new CoinCounter('gbp', '£');
    }).toThrow('Invalid amount');
  });

  test('should throw error on invalid amount (0.001)', () => {
    expect(() => {
      new CoinCounter('gbp', 0.001);
    }).toThrow('Invalid amount');
  });

  test('should initialise successfully with valid currency and amount', () => {
    let coinCounter = new CoinCounter(validCurrency, validAmount);
    expect(coinCounter._currency).toEqual(validCurrency);
    expect(coinCounter._units).toEqual(numeral(validAmount).value() * 100);
  });

});

describe('static count', () => {

  test('should calculate the correct number of coins (1p)', () => {
    expect(CoinCounter.count('gbp', '£0.01')).toEqual('1 * 1p');
  });

  test('should calculate the correct number of coins (2p)', () => {
    expect(CoinCounter.count('gbp', '£0.02')).toEqual('1 * 2p');
  });

  test('should calculate the correct number of coins (5p)', () => {
    expect(CoinCounter.count('gbp', '£0.05')).toEqual('1 * 5p');
  });

  test('should calculate the correct number of coins (10p)', () => {
    expect(CoinCounter.count('gbp', '£0.10')).toEqual('1 * 10p');
  });

  test('should calculate the correct number of coins (20p)', () => {
    expect(CoinCounter.count('gbp', '£0.20')).toEqual('1 * 20p');
  });

  test('should calculate the correct number of coins (50p)', () => {
    expect(CoinCounter.count('gbp', '£0.50')).toEqual('1 * 50p');
  });

  test('should calculate the correct number of coins (£1)', () => {
    expect(CoinCounter.count('gbp', '£1.00')).toEqual('1 * £1');
  });

  test('should calculate the correct number of coins (£2)', () => {
    expect(CoinCounter.count('gbp', '£2.00')).toEqual('1 * £2');
  });

  test('should calculate the correct number of coins (£7.65)', () => {
    expect(CoinCounter.count('gbp', '£7.65')).toEqual('3 * £2, 1 * £1, 1 * 50p, 1 * 10p, 1 * 5p');
  });

  test('should calculate the correct number of coins (£99.99)', () => {
    expect(CoinCounter.count('gbp', '£99.99')).toEqual('49 * £2, 1 * £1, 1 * 50p, 2 * 20p, 1 * 5p, 2 * 2p');
  });

});
