/********************************************
 * Author: Briana Olsen
 * SAVED COINS
 * Saves coins to local storage and displays
 * them in a table with their corresponding
 * amounts and exchange
 ********************************************/

export default class SavedCoins {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.displayInput();
    displayCoins();
  }

  /********************************************
   * DISPLAY INPUT
   * Builds the input, exchange option, and button
   * for adding a coin to local storage
   *******************************************/
  displayInput() {
    // Input - number of coins
    this.addCoinInput = document.createElement("input");
    this.addCoinInput.id = "addCoinInput";
    this.addCoinInput.placeholder = "# of coins";
    this.addCoinInput.style.visibility = "hidden";
    this.parentElement.appendChild(this.addCoinInput);

    // Exchange select input from Binance, CoinbasePro, Gemini
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

    // Add Coin Button
    this.addCoinButton = document.createElement("button");
    this.addCoinButton.id = "addCoinButton";
    this.addCoinButton.innerHTML = "Add Coins";
    this.addCoinButton.style.visibility = "hidden";
    this.parentElement.appendChild(this.addCoinButton);

    // Error for invalid input
    this.error = document.createElement("div");
    this.error.id = "error";
    this.error.style.visibility = "hidden";
    this.parentElement.appendChild(this.error);

    // Table for coins
    let tableHead = document.createElement("h2");
    tableHead.innerHTML = "My Coins";
    this.parentElement.appendChild(tableHead);

    this.coinsTable = document.createElement("table");
    this.coinsTable.id = "coinsTable";
    this.parentElement.appendChild(this.coinsTable);

    // Call addCoin function when button is clicked
    this.addCoinButton.addEventListener("click", addCoin);
  }
}

/********************************************
 * SAVE LOCAL STORAGE
 * Saves an array to local storage
 *******************************************/
function saveLocalStorage(coinsArray) {
  localStorage.setItem("coins", JSON.stringify(coinsArray));
}

/********************************************
 * LOAD LOCAL STORAGE
 * Loads the coin array from storage or returns
 * an empty array
 *******************************************/
function loadLocalStorage() {
  if (localStorage.getItem("coins")) {
    return JSON.parse(localStorage.getItem("coins"));
  } else {
    return [];
  }
}

/********************************************
 * DISPLAY COINS
 * Builds and displays the coins and their 
 * corresponding amounts and exchange.
 *******************************************/
function displayCoins(i = -1) {
  let array = loadLocalStorage();
  let coinsTable = document.getElementById("coinsTable");
  coinsTable.innerHTML = "";

  const tr = document.createElement("tr");

  const thCoin = document.createElement("th");
  thCoin.innerHTML = "Coin";
  tr.appendChild(thCoin);
  thCoin.addEventListener('click', sortByCoin);

  const thAmount = document.createElement("th");
  thAmount.innerHTML = "Amount";
  tr.appendChild(thAmount);
  thAmount.addEventListener('click', sortByAmount);

  const thExchange = document.createElement("th");
  thExchange.innerHTML = "Exchange";
  tr.appendChild(thExchange);
  thExchange.addEventListener('click', sortByExchange);

  coinsTable.appendChild(tr);

  // displays each coin on it's own row
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

    // removes coin when clicked
    tr.addEventListener("mousedown", removeCoin);
    coinsTable.appendChild(tr);
  });

  if(i > -1) {
    coinsTable.rows[i+1].cells[1].classList.add('added');
    let add = setTimeout(() => {coinsTable.rows[i+1].cells[1].classList.remove('added')}, 1500);
  }

   
}

/********************************************
 * ADD COIN
 * Adds a coin to local storage
 *******************************************/
function addCoin() {
  let array = loadLocalStorage();
  let coin = document.getElementById("search").placeholder;
  let amount = parseFloat(document.getElementById("addCoinInput").value);
  let exchange = document.getElementById("addExchange").value; 
  let i = -1;

  // Checks for valid input and displays an error if invalid
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
    array.forEach((c, index) => {
      if (c.name == coin && c.exchange == exchange) {
        c.amount += amount;
        exists = true;
        i = index;
      }
    });

    // adds coin to the array and saves it to local storage if valid
    if (!exists) {
      array.push({ name: coin, amount: amount, exchange: exchange });
    }
    saveLocalStorage(array);
    displayCoins(i);
  }
}

/********************************************
 * REMOVE COIN
 * Removes a coin from the table and array
 *******************************************/
function removeCoin() {
  // removes the row of the coin from the table
  //this.parentNode.removeChild(this);
  this.classList.add('deleted');
  this.style.opacity = 0;
  setTimeout(() => this.parentNode.removeChild(this), 900);


  // gets the info from the table 
  let name = this.getElementsByTagName("td")[0].innerHTML;
  let amount = parseFloat(this.getElementsByTagName("td")[1].innerHTML);
  let exchange = this.getElementsByTagName("td")[2].innerHTML;

  // searches the array for the coin
  let array = loadLocalStorage();
  let index = -1;
  for(let i = 0; i < array.length; i++) {
    if (array[i].name == name && array[i].exchange == exchange && array[i].amount == amount) {
      index = i;
    }
  }

  // splice the coin out of the array
  if(index != -1) {
    array.splice(index, 1);
  }

  // saves the new array to local storage
  saveLocalStorage(array);
}


/********************************************
 * SORT BY COIN
 * Sorts the Table Alphabetically by Coin Name
 *******************************************/
function sortByCoin() {
  let array = loadLocalStorage();
  array.sort((a,b)=>{
    let aname = a.name;
    let bname = b.name;
    if(aname < bname) {return -1;}
    if(aname > bname) {return 1;}
    return 0;
  });
  saveLocalStorage(array);
  displayCoins();
}

/********************************************
 * SORT BY AMOUNT
 * Sorts the Table by Coin Amount (highest)
 *******************************************/
function sortByAmount() {
  let array = loadLocalStorage();

  array.sort((a,b)=>{
    return b.amount - a.amount;
  });

  saveLocalStorage(array);
  displayCoins();
}

/********************************************
 * SORT BY EXCHANGE
 * Sorts the Table by Exchange Alphabetically
 *******************************************/
function sortByExchange() {
  let array = loadLocalStorage();
  array.sort((a,b)=>{
    let aname = a.name;
    let bname = b.name;
    if(aname < bname) {return -1;}
    if(aname > bname) {return 1;}
    return 0;
  });

  array.sort((a,b)=>{
    let aexchange = a.exchange;
    let bexchange = b.exchange;
    if(aexchange < bexchange) {return -1;}
    if(aexchange > bexchange) {return 1;}
    return 0;
  })
  saveLocalStorage(array);
  displayCoins();
}