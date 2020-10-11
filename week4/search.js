//const form = document.forms[0];
// SAME AS: const form = document.getElementsByTagname('form')[0];
// SAME AS: const form = document.forms['search'];

// const [input,button] = form.elements;
// CAN ALSO USE: const input = form.searchInput
// CAN ALSO USE: const input = form['searchInput']

//const input = form.elements.searchInput;

// EVENT LISTENER: FOCUS
//input.addEventListener('focus', () => alert('focused'), false);

// EVENT LISTENER: BLUR
//input.addEventListener('blur', () => alert('blurred'), false);

// EVENT LISTENER: CHANGE
//input.addEventListener('change', () => alert('changed'), false);

// EVENT LISTENER: SUBMIT
const form = document.forms['search'];
form.addEventListener ('submit', search, false);

/*
function search() {
    alert(' Form Submitted');
}*/

/*
function search(event) {
  alert('Form Submitted');
  event.preventDefault();
}*/

// THIS DOESN'T WORK? 
function search(event) {
  alert(`You Searched for: ${input.value}`);
  event.preventDefault();
}