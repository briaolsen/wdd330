
// CLICK EVENT LISTENER TO CLICKPARAGRAPH
const clickParagraph = document.getElementById("click");
clickParagraph.addEventListener("click", () => console.log("click"));
clickParagraph.addEventListener("mousedown", () => console.log("down"));
clickParagraph.addEventListener("mouseup", () => console.log("up"));

// DOUBLE CLICK EVENT LISTENER TO DBLCLICKPARAGRAPH
const dblclickParagraph = document.getElementById("dblclick");
dblclickParagraph.addEventListener("dblclick", highlight);
function highlight(event) {
  event.target.classList.toggle("highlight");
}

// MOUSEOVER, MOUSEOUT, MOUSEMOVE EVENT LISTENERS TO MOUSEPARAGRAPH
const mouseParagraph = document.getElementById("mouse");
mouseParagraph.addEventListener("mouseover", highlight);
mouseParagraph.addEventListener("mouseout", highlight);
mouseParagraph.addEventListener("mousemove", () => console.log("You Moved!"));

// KEY EVENT LISTENERS
addEventListener("keydown", highlight);
addEventListener("keyup", (event) =>
  console.log(`You stopped pressing the key on ${new Date()}`)
);
addEventListener("keypress", (event) =>
  console.log(`You pressed the ${event.key} character`)
);
addEventListener("keydown", (event) =>
  console.log(`You pressed the ${event.key} character`)
);
addEventListener("keydown", (event) => {
  if (event.key === "c" && event.ctrlKey) {
    console.log("Action canceled!");
  }
});

// SHIFTY CLICK
addEventListener("click", (event) => {
  if (event.shiftKey) {
    console.log("A Shifty Click!");
  }
});

// REMOVE EVENT LISTENER
const onceParagraph = document.getElementById("once");
onceParagraph.addEventListener("click", remove);
function remove(event) {
  console.log("Enjoy this while it lasts!");
  onceParagraph.style.backgroundColor = "pink";
  onceParagraph.removeEventListener("click", remove);
}

// PREVENT DEFAULT
const brokenLink = document.getElementById('broken');
brokenLink.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('Broken Link!');
});

// BUBBLING

ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');
/*ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul') );
liElement.addEventListener('click', (event) =>
console.log('Clicked on li') );*/

// CAPTURING
/*
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'),true);
liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),true);*/

// BUBBLING AND CAPTURING
//capturing
/*
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'),true);
liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),true);
// bubbling
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'),false );
liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),false );*/

// PREVENTING BUBBLING
liElement.addEventListener('click', (event) => {
  console.log('clicked on li');
  event.stopPropagation(); }, false);

/*
function doSomething(){
  console.log('Something Happened!');
}

function doSomethingElse(event){
  console.log("The event type: " + event.type);
}

function doSomethingElseAgain(event){
  console.log("The event target: " + event.target);
}

function doSomethingData(event){
  console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`)
}

addEventListener('click', doSomething);
addEventListener('click', doSomethingElse);
addEventListener('click', doSomethingElseAgain);
addEventListener('click', doSomethingData);
*/
