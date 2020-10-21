export default class ToDos {
  constructor(elementId, addButtonId, inputId) {
    this.parentElement = document.getElementById(elementId);
    this.addButton = document.getElementById(addButtonId);
    this.inputElement = document.getElementById(inputId);
    this.taskList = [{description: "First Task", checked: ""}];

    this.addButton.addEventListener("onclick", (e) => {
      console.log("Added Button Listener");
      this.addTask();
    });
  }

  /* Adds a Task to the List */
  addTask() {
    console.log("Add Task");
    const inputTask = this.inputElement.value;
    this.taskList.push({ description: inputTask, checked: "" });
    this.addTaskListener();
    this.showAll();
  }

  /* Removes a Task from the List */
  removeTask(taskNum) {}

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
  updateRemaining() {}

  /* Updates a Task as Completed or Incomplete */
  updateTask(taskNum) {}
}

function renderTaskList(parent, tasks) {
  tasks.forEach((task) => {
    parent.appendChild(renderOneTask(task));
  });
}

function renderOneTask(task) {
  const item = document.createElement("div");
  item.className = "todo";

  item.innerHTML = `
    <label class="container">${task.description}
      <input type="checkbox" ${task.checked}>
      <span class="checkmark"></span>
    </label>
    <div class="remove-btn">X</div>`;

  return item;
}
