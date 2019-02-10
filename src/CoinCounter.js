const numeral = require('numeral');

class CoinCounter {
  constructor(currency, amount) {
    this._currency = currency;
    this._amount = amount;
    this._currencies = {
      gbp: [
        {value: 200, name: '£2'},
        {value: 100, name: '£1'},
        {value: 50, name: '50p'},
        {value: 20, name: '20p'},
        {value: 10, name: '10p'},
        {value: 5, name: '5p'},
        {value: 2, name: '2p'},
        {value: 1, name: '1p'}
      ]
    };
    this.validateCurrency();
    this.validateAmount();
    this.countCoins();
  }

  validateCurrency() {
    let currencyIncluded = Object.keys(this._currencies).includes(this._currency);
    if(!currencyIncluded) throw Error('Invalid currency');
  }

  validateAmount() {
    let units = numeral(this._amount).value() * 100;
    if(isNaN(units) || units === 0 || units % 1 !== 0 ) throw Error('Invalid amount');
    this._units = units;
  }

  countCoins() {
    let remainder = this._units;
    this._currencies[this._currency]
      .forEach(coin => {
        coin.count = Math.floor(remainder / coin.value);
        remainder = remainder % coin.value;
      });
  }

  display() {
    return this._currencies[this._currency]
      .filter(coin => coin.count > 0)
      .map(coin => `${coin.count} * ${coin.name}`)
      .join(', ');
  }

  static count(currency, amount) {
    return new this(currency, amount).display();
  }

}

module.exports = CoinCounter;
