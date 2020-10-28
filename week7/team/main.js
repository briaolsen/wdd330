import Hikes from './hikes.js';

const myHike = new Hikes('hikes');

window.addEventListener('load', () => {
   myHike.showHikeList();
 });