import Crypto from "./crypto.js";
import SavedCoins from "./savedCoins.js";

/********************************************
 * Author: Briana Olsen
 * CRYPTOHELPER CLASS
 * Builds the page for the crypto exchanges
 ********************************************/

export default class CryptoHelper {

  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.buildPage();
    this.myInterval;
  }

  /***********************************************************
   * BUILD PAGE
   * Builds and displays the Exchange Divs, Timestamp, 
   * Search Input, Suggestions
   ***********************************************************/
  buildPage() {
    this.parentElement.innerHTML = "";

    // Exchange Divs
    const exchangeContainer = document.createElement("div");
    exchangeContainer.id = "exchangeContainer";
    this.parentElement.appendChild(exchangeContainer);
    this.buildExchangeDiv("coinbasePro", exchangeContainer);
    this.buildExchangeDiv("binance", exchangeContainer);
    this.buildExchangeDiv("gemini", exchangeContainer);

    // Timestamp
    this.timestamp = document.createElement("h5");
    this.timestamp.id = "timestamp";
    this.parentElement.appendChild(this.timestamp);

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
    const savedCoins = new SavedCoins(this.parentElement.id);
  }

  /***********************************************************
   * BUILD EXCHANGE DIV
   * Builds the Exchange Divs with Names and Prices
   ***********************************************************/
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

  /***********************************************************
   * DISPLAY MATCHES
   * Displays the search results
   ***********************************************************/
  displayMatches() {

    // make sure the add coins items are hidden while searching
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("addCoinInput").style.visibility = "hidden";
    document.getElementById("addCoinButton").style.visibility = "hidden";
    document.getElementById("addExchange").style.visibility = "hidden";

    // filter coins with current input
    const myCrypto = new Crypto(this.parentElement);
    const matchArray = myCrypto.coins.filter((coin) => {
      const regex = new RegExp(this.value, "gi");
      return coin.symbol.match(regex) || coin.fullname.match(regex);
    });

    // create a list of all the search results
    matchArray.forEach((coin) => {
      const regex = new RegExp(this.value, "gi");

      const li = document.createElement("li");
      li.className = "coinList";
      li.innerHTML = `<span class="coin">${coin.symbol} - ${coin.fullname}</span>`;
      document.getElementById("suggestions").appendChild(li);

      // Clear suggestions, and add in the placeholder of the search item clicked on
      li.addEventListener("mousedown", () => {
        document.getElementById("suggestions").innerHTML = '';
        document.getElementById("search").value = '';
        document.getElementById("search").placeholder = `${coin.symbol} - ${coin.fullname}`;

        // Show items to add coins to storage and table
        document.getElementById("addCoinInput").style.visibility = "visible";
        document.getElementById("addCoinButton").style.visibility = "visible";
        document.getElementById("addExchange").style.visibility = "visible";

        // get price of coin and display time
        myCrypto.getPriceAll(coin.symbol, `${coin.symbol} - ${coin.fullname}`);
        displayTime();

        // clear interval from last coin if this isn't the first search
        if (this.myInterval) {
          window.clearInterval(this.myInterval);
        }

        // check coin every 5000 ms
        this.myInterval = window.setInterval(function () {
          const myCrypto = new Crypto(this.parentElement);
          myCrypto.getPriceAll(coin.symbol, `${coin.symbol} - ${coin.fullname}`);
          displayTime();
        }, 5000);
      });
    });
  }
}

/***********************************************************
* DISPLAY TIME
* Displays a timestamp of the current time
* MM/DD/YYYY -- H:M:S AM/PM
***********************************************************/
function displayTime() {

  let timestamp = document.getElementById("timestamp");

  let date = new Date();
  let hours24 = date.getHours();
  let hours = ((hours24 + 11) % 12) + 1;
  let amPM = hours24 > 11 ? "PM" : "AM";
  let minutes =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  let seconds =
    date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

  timestamp.innerHTML = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} -- ${hours}:${minutes}:${seconds} ${amPM}`;
}
