import ToDos from './ToDos.js'

const tasks = new ToDos('todos-div');

window.addEventListener('load', () => {
  tasks.showAll();
});