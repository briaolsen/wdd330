import ToDos from './ToDos.js'

const tasks = new ToDos('todos-div', 'add-btn', 'task-input');

window.addEventListener('load', () => {
  tasks.showAll();
});