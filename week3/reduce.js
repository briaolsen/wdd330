// https://www.digitalocean.com/community/tutorials/js-finally-understand-reduce

/* REDUCING WITHOUT REDUCE()
const value = 0;
const numbers = [5, 10, 15];
for(let i = 0; i < numbers.length; i++) {
  value += numbers[i];
}
*/


/* this is our initial value i.e. the starting point*/
const initialValue = 0;

/* numbers array */
const numbers = [5, 10, 15];

/* reducer method that takes in the accumulator and next item */
const reducer = (accumulator, item) => {
  console.log("accumulator is " + accumulator + " item is " + item);
  return accumulator + item;
};

/* we give the reduce method our reducer function
  and our initial value */
const total = numbers.reduce(reducer, initialValue);