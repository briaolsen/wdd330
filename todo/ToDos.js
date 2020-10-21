export default class ToDos {
  constructor(elementId, addButtonId, inputId) {
    this.parentElement = document.getElementById(elementId);
    this.addButton = document.getElementById(addButtonId);
    this.inputElement = document.getElementById(inputId);
    this.taskList = [{description: "First Task", checked: "false"}];

    this.addButton.addEventListener('click', (e) => {
      console.log("Added Button Listener");
      this.addTask();
    });
  }

  /* Adds a Task to the List */
  addTask() {
    console.log("Add Task");
    const inputTask = this.inputElement.value;
    this.taskList.push({ description: inputTask, checked: "false" });
    this.addTaskListener();
    this.showAll();
  }

  /* Removes a Task from the List */
  removeTask() {}

  /* Shows all Tasks */
  showAll() {
    console.log("Show All");
    this.parentElement.innerHTML = "";
    renderTaskList(this.parentElement, this.taskList);
  }

  /* Shows Active Tasks */
  showActive() {}

  /* Shows Completed Tasks */
  showCompleted() {}

  /* Adds Listeners to Each Task */
  addTaskListener() {}

  /* Updates the Number of Remaining Tasks to Complete */
  updateRemaining() {

  }

  /* Updates a Task as Completed or Incomplete */
  updateTask() {}
}

function renderTaskList(parent, tasks) {
  tasks.forEach((task) => {
    parent.appendChild(renderOneTask(task));
  });
}

function renderOneTask(task) {
  const item = document.createElement("div");
  item.className = "todo";

  const label = document.createElement("label");
  label.className = "container";
  label.innerHTML = task.description;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.checked;

  const span = document.createElement("span");
  span.className = "checkmark";
  
  const button = document.createElement("div");
  button.className = "remove-btn";
  button.innerHTML = "X";

  label.appendChild(checkbox);
  label.appendChild(span);

  item.appendChild(label);
  item.appendChild(button);

  /*
  item.innerHTML = `
    <label class="container">${task.description}
      <input type="checkbox" ${task.checked}>
      <span class="checkmark"></span>
    </label>
    <div class="remove-btn">X</div>`;
*/
  return item;
}
