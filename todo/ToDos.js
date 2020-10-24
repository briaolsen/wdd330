import * as ls from './ls.js'


/******************************************************
 * CLASS: TODOS
 * Creates a todo list
 ******************************************************/
export default class ToDos {

  constructor(elementId, filtersId, addButtonId, inputId) {
    this.parentElement = document.getElementById(elementId);
    this.numTasks = this.buildFilters(document.getElementById(filtersId));
    this.addButton = document.getElementById(addButtonId);
    this.inputElement = document.getElementById(inputId);
    this.taskList = ls.getLocalStorage();
    this.display = "all";

    this.addButton.addEventListener('click', (e) => {
      this.addTask();
    });

    this.inputElement.addEventListener('submit', e => {
      this.addTask();
    });
  }

  /******************************************************
   * BUILD FILTERS
   * Builds the filter options and adds event listeners
   ******************************************************/
  buildFilters(filters) {

    const numTasks = document.createElement("div");
    numTasks.id = "num-tasks";
    numTasks.innerHTML = "# tasks left";

    // BUILD "ALL" FILTER
    const allBtn = document.createElement("div");
    allBtn.className = "currentFilter";
    allBtn.id = "all-btn";
    allBtn.innerHTML = "All";
    allBtn.addEventListener('click', e => {
      allBtn.className = "currentFilter";
      activeBtn.className = "filter";
      completeBtn.className = "filter";
      this.display = "all";
      this.displayTasks();
    });

    // BUILD "ACTIVE" FILTER
    const activeBtn = document.createElement("div");
    activeBtn.className = "filter";
    activeBtn.id = "active-btn";
    activeBtn.innerHTML = "Active";
    activeBtn.addEventListener('click', e => {
      allBtn.className = "filter";
      activeBtn.className = "currentFilter";
      completeBtn.className = "filter";
      this.display = "active";
      this.displayTasks();
    });

    // FILL "COMPLETE" FILTER
    const completeBtn = document.createElement("div");
    completeBtn.className = "filter";
    completeBtn.id = "complete-btn";
    completeBtn.innerHTML = "Completed";
    completeBtn.addEventListener('click', e => {
      allBtn.className = "filter";
      activeBtn.className = "filter";
      completeBtn.className = "currentFilter";
      this.display = "completed";
      this.displayTasks();
    });

    // APPEND FILTERS TO FILTERS-DIV
    filters.appendChild(numTasks);
    filters.appendChild(allBtn);
    filters.appendChild(activeBtn);
    filters.appendChild(completeBtn);

    return numTasks;
  }

  /******************************************************
   * ADD TASK
   * Adds a Task to the List
   ******************************************************/
  addTask() {
    console.log("Add Task");
    const inputTask = this.inputElement.value;
    this.taskList.push({ description: inputTask, checked: false });
    ls.saveLocalStorage(this.taskList);
    this.displayTasks();
  }

  /******************************************************
   * UPDATE TASK NUM
   * Updates the current number of tasks remaining
   ******************************************************/
  updateTaskNum() {
    let t = 0;
    for(let i = 0; i < this.taskList.length; i++){
      if(this.taskList[i].checked === false) {
        t++;
      }
    }

    if(t === 1) {
      this.numTasks.innerHTML = `${t} task left`;
    } else {
      this.numTasks.innerHTML = `${t} tasks left`;
    }
  }

  /******************************************************
   * DISPLAY TASKS
   * Checks the current display option and calls for the 
   * display of the appropriate tasks
   ******************************************************/
  displayTasks() {
    switch (this.display) {
      case "all":
        this.showAll();
        break;
      case "active":
        this.showActive();
        break;
      case "completed":
        this.showCompleted();
        break;
      default:
        this.showAll();
    }

    this.updateTaskNum();
  }

  /******************************************************
   * REMOVE TASK
   * Removes a task from the list and displays again
   ******************************************************/
  removeTask(i) {
    this.taskList.splice(i, 1);
    ls.saveLocalStorage(this.taskList);
    this.displayTasks();
  }

  /******************************************************
   * SHOW ALL 
   * Displays all the tasks, completed and not completed
   ******************************************************/
  showAll() {
    console.log("Show All");
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.taskList.length; i++) {
      this.parentElement.appendChild(this.makeTask(this.taskList[i], i));
    }
  }

  /******************************************************
   * SHOW ACTIVE
   * Displays all the active tasks (incompleted)
   ******************************************************/
  showActive() {
    console.log("Show Active");
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.taskList.length; i++) {
      if(this.taskList[i].checked === false) {
        this.parentElement.appendChild(this.makeTask(this.taskList[i], i));
      }
    }
  }

  /******************************************************
   * SHOW COMPLETED 
   * Displays all the completed tasks
   ******************************************************/
  showCompleted() {
    console.log("Show Completed");
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.taskList.length; i++) {
      if(this.taskList[i].checked === true) {
        this.parentElement.appendChild(this.makeTask(this.taskList[i], i));
      }
    }
  }

  /******************************************************
   * SHOW ALL 
   * Updates a task to be complete or incomplete depending
   * on how it was already marked.
   ******************************************************/
  updateTask(i) {
    if (this.taskList[i].checked === true) {
      this.taskList[i].checked = false;
    } else {
      this.taskList[i].checked = true;
    }
    ls.saveLocalStorage(this.taskList);
    this.displayTasks();
  }

  /******************************************************
   * MAKE TASK
   * Creates the HTML needed for the task
   ******************************************************/
  makeTask(task, numTask) {
    // Creates the parent div
    const item = document.createElement("div");
    item.className = "todo";
  
    // Create the label for the checkbox
    const label = document.createElement("label");
    label.className = "container";
    if(task.checked) {
      label.innerHTML = `<del>${task.description}</del>`;
    } else {
      label.innerHTML = task.description;
    }
  
    // Create the checkbox, add event listener 
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    checkbox.addEventListener('click', e => {
      if(task.checked) {
        label.innerHTML = `<del>${task.description}</del>`;
      } else {
        label.innerHTML = task.description;
      }
      this.updateTask(numTask);
    });
  
    // Create the checkmark for css
    const span = document.createElement("span");
    span.className = "checkmark";
    
    // Create the remove button div
    const button = document.createElement("div");
    button.className = "remove-btn";
    button.innerHTML = "X";
    button.addEventListener('click', e => {
      this.removeTask(numTask);
    });
  
    // Append the checkbox and span to the label
    label.appendChild(checkbox);
    label.appendChild(span);
  
    // Append the label and button to the parent div
    item.appendChild(label);
    item.appendChild(button);

    return item;
  }

}

