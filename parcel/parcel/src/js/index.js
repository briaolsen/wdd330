import shipController from "./ships";

console.log(shipController.getShips());
console.table(shipController.getShipByName("Executor"));

// check to see if javascript is working
function component() {
  const element = document.createElement("p");

  element.innerHTML = "Setup Appears to be working &#128521;";
  //element.innerHTML = shipController.getShipByName("Executor");

  return element;
}

document.body.appendChild(component());

// shipController.getShips().then((data) => {
//   console.log(data);
// });
