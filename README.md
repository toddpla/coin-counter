# Coin Counter

## Challenge

## Installation
clone the repo and install:
```sh
git clone https://github.com/toddpla/coin-counter.git
cd coin-counter
npm install
```

## Running the CLI
from the root directory:
```sh
npm start
```
you will then be aksed to select the currency and then the amount.  
N.B. Currently the application has only one currency; 'gbp'.
![demo-screenshot](docs/assets/demo-screenshot.png)

## Testing
from the root directory:
```sh
npm test
```
or with coverage report:
```sh
npm test -- --coverage
```
![coverage-screenshot](docs/assets/coverage-screenshot.png)


## Development notes
- The logic of interest for this challenge can found in the CoinCounter.countCoins() (copied below).
I chose not to Google other solutions and went with this approach whereby iterating through the coins available in the currency selected.
```js
countCoins() {
  let remainder = this._units;
  this._currencies[this._currency]
    .forEach(coin => {
      coin.count = Math.floor(remainder / coin.value);
      remainder = remainder % coin.value;
    });
}
```
This logic relies on the coins being listed in descending value order. To ensure this is correct a sort function could be added to ensure this is so. e.g. `.sort((a, b) => b.value = a.value)` But I felt in the current situation this would be redundant code.

- Other than devDependencies I aimed for the application to have no dependencies however chose to use Numeral-js as a tool to validate the amount input which considering the time constraint I thought reasonable.

- The brief mentioned using UK currency so the CoinCounter has been designed so that additional currencies can be integrated by adding them to the constructor function.

- I went slightly over the time limit as I decided to include a CLI as I was unsure whether this was a requirement.
