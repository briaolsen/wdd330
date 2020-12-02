import Crypto from "./crypto.js";

const coins = [
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

export default class CryptoHelper {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.buildPage();
    this.crypto = new Crypto(this.parentElement);
  }

  buildPage() {
    this.parentElement.innerHTML = "";

    // Coin Name
    this.coinName = document.createElement("h3");
    this.coinName.id = "coinName";
    this.parentElement.appendChild(this.coinName);

    // Exchange Divs
    const exchangeContainer = document.createElement("div");
    exchangeContainer.id = "exchangeContainer";
    this.parentElement.appendChild(exchangeContainer);
    this.buildExchangeDiv("coinbasePro", exchangeContainer);
    this.buildExchangeDiv("binance", exchangeContainer);
    this.buildExchangeDiv("gemini", exchangeContainer);

    // Search Input
    this.search = document.createElement("input");
    this.search.type = "text";
    this.search.placeholder = "search coins";
    this.search.id = "search";
    this.search.autocomplete = "off";
    this.search.addEventListener("change", this.displayMatches);
    this.search.addEventListener("keyup", this.displayMatches);
    this.parentElement.appendChild(this.search);

    // Suggestions
    this.suggestions = document.createElement("ul");
    this.suggestions.id = "suggestions";
    this.parentElement.appendChild(this.suggestions);

    // Saved Coins Table
    this.buildCoinsTable();
  }

  buildExchangeDiv(id, exchangeContainer) {
    // Exchange Container
    const exchangeDiv = document.createElement("div");
    exchangeDiv.id = id;
    exchangeDiv.className = "exchange";

    // Exchange Name
    const exchangeName = document.createElement("h2");
    exchangeName.id = id + "Name";
    exchangeName.innerHTML = id.charAt(0).toUpperCase() + id.slice(1);
    exchangeDiv.appendChild(exchangeName);

    // Exchange Price
    const price = document.createElement("h2");
    price.id = id + "Price";
    price.className = "price";
    exchangeDiv.appendChild(price);

    exchangeContainer.appendChild(exchangeDiv);
  }

  buildCoinsTable() {
    const coinsTable = document.createElement("table");
    coinsTable.id = "coinsTable";
    const tr = document.createElement("tr");
    const thCoin = document.createElement("th");
    const thCBP = document.createElement("th");
    const thB = document.createElement("th");
    const thG = document.createElement("th");

    thCoin.innerHTML = "Coin";
    thCBP.innerHTML = "Coinbase Pro";
    thB.innerHTML = "Binance";
    thG.innerHTML = "Gemini";

    tr.appendChild(thCoin);
    tr.appendChild(thCBP);
    tr.appendChild(thB);
    tr.appendChild(thG);

    coinsTable.appendChild(tr);

    this.parentElement.appendChild(coinsTable);
  }

  displayMatches() {
    const matchArray = coins.filter((coin) => {
      const regex = new RegExp(this.value, "gi");
      return coin.symbol.match(regex) || coin.fullname.match(regex);
    });

    document.getElementById("suggestions").innerHTML = "";

    matchArray.forEach((coin) => {
      const regex = new RegExp(this.value, "gi");

      const li = document.createElement("li");
      li.className = "coinList";
      li.innerHTML = `<span class="coin">${coin.symbol} - ${coin.fullname}</span>`;
      document.getElementById("suggestions").appendChild(li);

      li.addEventListener("mousedown", () => {
        document.getElementById(
          "coinName"
        ).innerHTML = `${coin.symbol} - ${coin.fullname}`;

        const myCrypto = new Crypto(this.parentElement);
        myCrypto.getPriceAll(coin.symbol);

        document.getElementById("suggestions").innerHTML = "";
        document.getElementById("search").value = "";
      });
    });
  }
}
