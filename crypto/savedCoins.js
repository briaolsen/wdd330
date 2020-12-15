export default class SavedCoins {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.displayInput();
    displayCoins();
  }

  displayInput() {
    this.addCoinInput = document.createElement("input");
    this.addCoinInput.id = "addCoinInput";
    this.addCoinInput.placeholder = "# of coins";
    this.addCoinInput.style.visibility = "hidden";
    this.parentElement.appendChild(this.addCoinInput);

    this.addExchange = document.createElement("select");
    this.addExchange.id = "addExchange";
    this.addExchange.style.visibility = "hidden";

    let eOption = document.createElement("option");
    eOption.value = "";
    eOption.innerHTML = "Exchange";
    eOption.selected = true;
    eOption.disabled = true;
    let cbpOption = document.createElement("option");
    cbpOption.value = "CoinbasePro";
    cbpOption.innerHTML = cbpOption.value;
    let bOption = document.createElement("option");
    bOption.value = "Binance";
    bOption.innerHTML = bOption.value;
    let gOption = document.createElement("option");
    gOption.value = "Gemini";
    gOption.innerHTML = gOption.value;

    this.addExchange.appendChild(eOption);
    this.addExchange.appendChild(cbpOption);
    this.addExchange.appendChild(bOption);
    this.addExchange.appendChild(gOption);
    this.parentElement.appendChild(this.addExchange);

    this.addCoinButton = document.createElement("button");
    this.addCoinButton.id = "addCoinButton";
    this.addCoinButton.innerHTML = "Add Coins";
    this.addCoinButton.style.visibility = "hidden";
    this.parentElement.appendChild(this.addCoinButton);

    this.error = document.createElement("div");
    this.error.id = "error";
    this.error.style.visibility = "hidden";
    this.parentElement.appendChild(this.error);

    let tableHead = document.createElement("h2");
    tableHead.innerHTML = "My Coins";
    this.parentElement.appendChild(tableHead);

    this.coinsTable = document.createElement("table");
    this.coinsTable.id = "coinsTable";
    this.parentElement.appendChild(this.coinsTable);

    this.addCoinButton.addEventListener("click", addCoin);

  
  }
}

function saveLocalStorage(coinsArray) {
  localStorage.setItem("coins", JSON.stringify(coinsArray));
}

function loadLocalStorage() {
  if (localStorage.getItem("coins")) {
    return JSON.parse(localStorage.getItem("coins"));
  } else {
    return [];
  }
}

function displayCoins() {
  let array = loadLocalStorage();

  let coinsTable = document.getElementById("coinsTable");

  coinsTable.innerHTML = "";

  const tr = document.createElement("tr");

  const thCoin = document.createElement("th");
  thCoin.innerHTML = "Coin";
  tr.appendChild(thCoin);

  const thAmount = document.createElement("th");
  thAmount.innerHTML = "Amount";
  tr.appendChild(thAmount);

  const thExchange = document.createElement("th");
  thExchange.innerHTML = "Exchange";
  tr.appendChild(thExchange);

  coinsTable.appendChild(tr);

  array.forEach((coin) => {
    const tr = document.createElement("tr");

    const tdCoin = document.createElement("td");
    tdCoin.innerHTML = coin.name;
    tr.appendChild(tdCoin);

    const tdAmount = document.createElement("td");
    tdAmount.innerHTML = coin.amount;
    tr.appendChild(tdAmount);

    const tdExchange = document.createElement("td");
    tdExchange.innerHTML = coin.exchange;
    tr.appendChild(tdExchange);

    tr.addEventListener("mousedown", removeCoin);
    coinsTable.appendChild(tr);
  });
}

function addCoin() {
  let array = loadLocalStorage();
  let coin = document.getElementById("search").placeholder;
  let amount = parseFloat(document.getElementById("addCoinInput").value);
  let exchange = document.getElementById("addExchange").value;

  if(!exchange && !amount) {
    document.getElementById("error").innerHTML = "***Please enter a valid number and choose an exchange***";
    document.getElementById("error").style.visibility = "visible";
  } else if (!amount) {
    document.getElementById("error").innerHTML = "***Please enter a valid number***";
    document.getElementById("error").style.visibility = "visible";
  } else if (!exchange) {
    document.getElementById("error").innerHTML = "***Please choose an exchange***";
    document.getElementById("error").style.visibility = "visible";
  } else {
    let exists = false;
    document.getElementById("error").style.visibility = "hidden";
    array.forEach((c) => {
      if (c.name == coin && c.exchange == exchange) {
        c.amount += amount;
        exists = true;
      }
    });

    if (!exists) {
      array.push({ name: coin, amount: amount, exchange: exchange });
    }

    saveLocalStorage(array);
    displayCoins(array);
  }
}

function removeCoin() {
  console.log(this);
  this.parentNode.removeChild(this);

  let name = this.getElementsByTagName("td")[0].innerHTML;
  let amount = parseFloat(this.getElementsByTagName("td")[1].innerHTML);
  let exchange = this.getElementsByTagName("td")[2].innerHTML;

  let item = {name: name, amount: amount, exchange: exchange};

  let array = loadLocalStorage();
  let index = -1;
  for(let i = 0; i < array.length; i++) {
    if (array[i].name == name && array[i].exchange == exchange && array[i].amount == amount) {
      index = i;
    }
  }

  if(index != -1) {
    array.splice(index, 1);
  }

  console.log(array);
  saveLocalStorage(array);
}