export default class Crypto {
  constructor(parent) {
    this.parentElement = parent;
    this.bPrice = 0;
    this.cPPrice = 0;
    this.gPrice = 0;
    this.bP = document.getElementById("binancePrice");
    this.cbpP = document.getElementById("coinbaseProPrice");
    this.gP = document.getElementById("geminiPrice");
    this.coin;
  }

  async getPriceAll(coin) {
    console.log("Called getPriceAll");
    this.coin = coin;

    this.bPrice = await this.fetchBinance(this.coin, this.bP);
    this.cPPrice = await this.fetchCoinbasePro(this.coin, this.cbpP);
    this.gPrice = await this.fetchGemini(this.coin, this.gP);
    
      
  }

  highlightHighest() {
    console.log("Finding Highest");
    this.bP.parentElement.classList.remove("highest");
    this.cbpP.parentElement.classList.remove("highest");
    this.gP.parentElement.classList.remove("highest");

    if (
      !isNaN(this.bPrice) &&
      this.bPrice > this.cPPrice &&
      this.bPrice > this.gPrice
    ) {
      this.bP.parentElement.classList.add("highest");
    } else if (
      !isNaN(this.cPPrice) &&
      this.cPPrice > this.bPrice &&
      this.cPPrice > this.gPrice
    ) {
      this.cbpP.parentElement.classList.add("highest");
    } else if (
      !isNaN(this.gPrice) &&
      this.gPrice > this.bPrice &&
      this.gPrice > this.cPPrice
    ) {
      this.gP.parentElement.classList.add("highest");
    }
  }

  async fetchCoinbasePro(coin, element) {
    const URL = `https://api.pro.coinbase.com/products/${coin}-USD/ticker`;
    let price = fetch(URL)
      .then((blob) => blob.json())
      .then((data) => {
        this.cPPrice = parseFloat(data.price);
        price = this.cPPrice;
        this.setPrice(this.cPPrice, element);
        return data.price;
      })
      .catch((error) => {
        console.error("Error with the CoinbasePro fetch operation", error);
      });
    return parseFloat(price);
  }

  async fetchBinance(coin, element) {
    const URL = `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`;

    let price = fetch(URL)
      .then((blob) => blob.json())
      .then((data) => {
        this.setPrice(data.price, element);
        return data.price;
      })
      .catch((error) => {
        console.error("Error with the Binance fetch operation", error);
        return '';
      });
    return parseFloat(price);
  }

  async fetchGemini(coin, element) {
    const URL = `https://api.gemini.com/v1/pubticker/${coin}usd`;
    let price = fetch(URL)
      .then((blob) => blob.json())
      .then((data) => {
        this.setPrice(data.last, element);
        return data.last;
      })
      .catch((error) => {
        console.error("Error with the Gemini fetch operation", error);
        return '';
      });
    return parseFloat(price);
  }

  setPrice(price, element) {
    let fixedPrice = parseFloat(price);
    fixedPrice = fixedPrice.toFixed(2);
    if (price != undefined && !isNaN(price)) {
      element.innerHTML = `$${fixedPrice}`;
    } else {
      element.innerHTML = ``;
    }
  }
}
