export default class Crypto {

  coins = [
    { symbol: "BTC", fullname: "Bitcoin" },
    { symbol: "ETH", fullname: "Ethereum" },
    { symbol: "BCH", fullname: "Bitcoin Cash" },
    { symbol: "LTC", fullname: "Litecoin" },
    { symbol: "ZEC", fullname: "Zcash" },
    { symbol: "BAT", fullname: "Basic Attention Token" },
    { symbol: "LINK", fullname: "Chainlink" },
    { symbol: "DAI", fullname: "Dai" },
    { symbol: "OXT", fullname: "Orchid" },
    { symbol: "FIL", fullname: "Filecoin" },
    { symbol: "AMP", fullname: "Ampleforth" },
    { symbol: "PAX", fullname: "Paxos Standard" },
    { symbol: "COMP", fullname: "Compound" },
    { symbol: "MKR", fullname: "Maker" },
    { symbol: "ZRX", fullname: "Ox" },
    { symbol: "KNC", fullname: "Kyber Network" },
    { symbol: "STORJ", fullname: "Storj" },
    { symbol: "MANA", fullname: "Decentraland" },
    { symbol: "AAVE", fullname: "Aave" },
    { symbol: "SNX", fullname: "Synthetix" },
    { symbol: "YFI", fullname: "yearn.finance" },
    { symbol: "UMA", fullname: "UMA" },
    { symbol: "BAL", fullname: "Balancer" },
    { symbol: "CRV", fullname: "Curve DAO Token" },
    { symbol: "REN", fullname: "Ren" },
    { symbol: "UNI", fullname: "Unibright" },
  ];

  constructor(parent) {
    this.parentElement = parent;
    this.bP = document.getElementById("binancePrice");
    this.cbpP = document.getElementById("coinbaseProPrice");
    this.gP = document.getElementById("geminiPrice");
    this.coin;
  }

  async getPriceAll(coin, coinName) {
    this.coin = coin;
    this.coinName = coinName;
    this.getPrices(highlight);
  }

  async getPrices(callback) {
    this.bPrice = await this.fetchBinance(this.coin, this.bP);
    this.cPPrice = await this.fetchCoinbasePro(this.coin, this.cbpP);
    this.gPrice = await this.fetchGemini(this.coin, this.gP);

    this.setPrice(this.coin, this.bPrice, this.bP, "Binance");
    this.setPrice(this.coin, this.cPPrice, this.cbpP, "CoinbasePro");
    this.setPrice(this.coin, this.gPrice, this.gP, "Gemini");

    callback();
  }

  async fetchCoinbasePro(coin, element) {
    const URL = `https://api.pro.coinbase.com/products/${coin}-USD/ticker`;
    let price = await fetch(URL)
      .then((blob) => blob.json())
      .then((data) => {
        return data.price;
      })
      .catch((error) => {
        console.error("Error with the CoinbasePro fetch operation", error);
        this.setPrice("", element, "CoinbasePro");
        return "";
      });
    return parseFloat(price);
  }

  async fetchBinance(coin, element) {
    const URL = `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`;
    let price = await fetch(URL)
      .then((blob) => blob.json())
      .then((data) => {
        return data.price;
      })
      .catch((error) => {
        console.error("Error with the Binance fetch operation", error);
        this.setPrice(coin, "", element, "Binance");
        return "";
      });
    return parseFloat(price);
  }

  async fetchGemini(coin, element) {
    const URL = `https://api.gemini.com/v1/pubticker/${coin}usd`;
    let price = await fetch(URL)
      .then((blob) => blob.json())
      .then((data) => {
        return data.last;
      })
      .catch((error) => {
        console.error("Error with the Gemini fetch operation", error);
        this.setPrice(coin, "", element, "Gemini");
        return "";
      });
    return parseFloat(price);
  }

  setPrice(coin, price, element, exchange) {
    let fixedPrice = parseFloat(price).toFixed(2);
    let array = [];
    let total = 0.00;

    if (localStorage.getItem("coins")) {
      array = JSON.parse(localStorage.getItem("coins"));
    }

    array.forEach((c) => {
      if (c.name == this.coinName && c.exchange == exchange) {
        total = (c.amount * price).toFixed(2);
      }
    });

    if (price != undefined && !isNaN(price) && price != "") {
      element.innerHTML = `$${fixedPrice} <br> <span class="total">$${total}</span>`;
    } else {
      element.innerHTML = ``;
    }
  }
}

function highlight() {
  let b = document.getElementById("binancePrice");
  let cbp = document.getElementById("coinbaseProPrice");
  let g = document.getElementById("geminiPrice");

  let bPrice = parseFloat(b.innerHTML.substring(1));
  let cbpPrice = parseFloat(cbp.innerHTML.substring(1));
  let gPrice = parseFloat(g.innerHTML.substring(1));

  bPrice = isNaN(bPrice) ? 0 : bPrice;
  cbpPrice = isNaN(cbpPrice) ? 0 : cbpPrice;
  gPrice = isNaN(gPrice) ? 0 : gPrice;

  b.parentElement.classList.remove("highest");
  cbp.parentElement.classList.remove("highest");
  g.parentElement.classList.remove("highest");

  if (bPrice > cbpPrice && bPrice > gPrice) {
    b.parentElement.classList.add("highest");
  } else if (cbpPrice > bPrice && cbpPrice > gPrice) {
    cbp.parentElement.classList.add("highest");
  } else if (gPrice > bPrice && gPrice > cbpPrice) {
    g.parentElement.classList.add("highest");
  }
}
