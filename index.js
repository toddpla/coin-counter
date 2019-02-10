const readline = require('readline');
const CoinCounter = require('./src/CoinCounter');

console.log('-------------------------------');
console.log('         Coin Counter');
console.log('-------------------------------');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const currencyQuestion = () => new Promise((resolve, reject) => {
  rl.question('What currency would you like to count? (e.g. gpb) ', (currency) => {
    console.log(`Currency selected: ${currency}\n`);
    resolve(currency);
  });
});

const amountQuestion = () => new Promise((resolve, reject) => {
  rl.question('How much would you like to count? (e.g. £7.65) ', (amount) => {
    console.log(`Amount entered: ${amount}\n`);
    resolve(amount);
  });
});

currencyQuestion().then(currency => {
  amountQuestion().then(amount => {
    console.log('Minimum number of coins are:');
    console.log(CoinCounter.count(currency, amount));
    rl.close();
  }).catch(err => console.log(err));
}).catch(err => console.log(err));
