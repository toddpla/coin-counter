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

}

module.exports = CoinCounter;
