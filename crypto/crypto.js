export default class Crypto {

  constructor(parent) {
    this.parentElement = parent;
  }

  getPriceAll(coin) {
    let bP = document.getElementById('binancePrice');
    let cbpP = document.getElementById('coinbaseProPrice');
    let gP = document.getElementById('geminiPrice');

    this.fetchBinance(coin, bP);
    this.fetchCoinbasePro(coin, cbpP);
    this.fetchGemini(coin, gP);
  }

  fetchCoinbasePro(coin, element) {
    const URL = `https://api.pro.coinbase.com/products/${coin}-USD/ticker`;
    fetch(URL)
    .then(blob => blob.json())
    .then(data => this.setPrice(data.price, element))
    .catch(error => {
      console.error(
        "Error with the CoinbasePro fetch operation",
        error
      );
    });
  }

  fetchBinance(coin, element) {
    const URL = `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`;

    fetch(URL)
      .then(blob => blob.json())
      .then(data => this.setPrice(parseFloat(data.price).toFixed(2), element))
      .catch(error => {
        console.error(
          "Error with the Binance fetch operation",
          error
        );
      });
  }

  fetchGemini(coin, element) {
    const URL = `https://api.gemini.com/v1/pubticker/${coin}usd`;

    fetch(URL)
    .then(blob => blob.json())
    .then(data => this.setPrice(data.last, element))
    .catch(error => {
      console.error(
        "Error with the Gemini fetch operation",
        error
      );
    });
  }

  setPrice(price, element) {
    if(price != undefined) {
      element.innerHTML = `$${price}`;
    } else {
      element.innerHTML = ``;
    }
  }
}
