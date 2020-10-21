import ToDos from './ToDos.js'

const tasks = new ToDos('todos-div', 'options-div', 'add-btn', 'task-input');

window.addEventListener('load', () => {
  tasks.displayTasks();
});