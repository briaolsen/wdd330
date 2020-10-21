export default class ToDos {
  constructor(elementId, optionsId, addButtonId, inputId) {
    this.parentElement = document.getElementById(elementId);
    this.numTasks = this.buildSortingOptions(document.getElementById(optionsId));
    this.addButton = document.getElementById(addButtonId);
    this.inputElement = document.getElementById(inputId);
    this.taskList = [{description: "First Task", checked: false}];
    this.display = "all";

    this.addButton.addEventListener('click', (e) => {
      console.log("Added Button Listener");
      this.addTask();
    });
  }

  /* Builds the Sorting Options and adds event listeners */
  buildSortingOptions(options) {
    const numTasks = document.createElement("div");
    numTasks.id = "num-tasks";
    numTasks.innerHTML = "# tasks left";

    const allBtn = document.createElement("div");
    allBtn.className = "optionsCurrent";
    allBtn.id = "all-btn";
    allBtn.innerHTML = "All";
    allBtn.addEventListener('click', e => {
      allBtn.className = "optionsCurrent";
      activeBtn.className = "options";
      completeBtn.className = "options";
      this.display = "all";
      this.displayTasks();
    });

    const activeBtn = document.createElement("div");
    activeBtn.className = "options";
    activeBtn.id = "active-btn";
    activeBtn.innerHTML = "Active";
    activeBtn.addEventListener('click', e => {
      allBtn.className = "options";
      activeBtn.className = "optionsCurrent";
      completeBtn.className = "options";
      this.display = "active";
      this.displayTasks();
    });

    const completeBtn = document.createElement("div");
    completeBtn.className = "options";
    completeBtn.id = "complete-btn";
    completeBtn.innerHTML = "Completed";
    completeBtn.addEventListener('click', e => {
      allBtn.className = "options";
      activeBtn.className = "options";
      completeBtn.className = "optionsCurrent";
      this.display = "completed";
      this.displayTasks();
    });

    options.appendChild(numTasks);
    options.appendChild(allBtn);
    options.appendChild(activeBtn);
    options.appendChild(completeBtn);

    return numTasks;
  }

  /* Adds a Task to the List */
  addTask() {
    console.log("Add Task");
    const inputTask = this.inputElement.value;
    this.taskList.push({ description: inputTask, checked: false });
    this.displayTasks();
  }

  updateTaskNum() {
    let t = 0;
    for(let i = 0; i < this.taskList.length; i++){
      if(this.taskList[i].checked === false) {
        t++;
      }
    }
    this.numTasks.innerHTML = `${t} tasks left`;
  }

  /* Checks the current display option and displays the appropriate tasks */
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

  /* Removes a Task from the List */
  removeTask(i) {
    this.taskList.splice(i, 1);
    this.displayTasks();
  }

  /* Shows all Tasks */
  showAll() {
    console.log("Show All");
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.taskList.length; i++) {
      this.parentElement.appendChild(this.makeTask(this.taskList[i], i));
    }
  }

  /* Shows Active Tasks */
  showActive() {
    console.log("Show Active");
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.taskList.length; i++) {
      if(this.taskList[i].checked === false) {
        this.parentElement.appendChild(this.makeTask(this.taskList[i], i));
      }
    }
  }

  /* Shows Completed Tasks */
  showCompleted() {
    console.log("Show Completed");
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.taskList.length; i++) {
      if(this.taskList[i].checked === true) {
        this.parentElement.appendChild(this.makeTask(this.taskList[i], i));
      }
    }
  }

  /* Adds Listeners to Each Task */
  addTaskListener() {}

  /* Updates a Task as Completed or Incomplete */
  updateTask(i) {
    if (this.taskList[i].checked === true) {
      this.taskList[i].checked = false;
    } else {
      this.taskList[i].checked = true;
    }
    this.displayTasks();
  }

  /* Create the task to append to the list */
  makeTask(task, numTask) {
    const item = document.createElement("div");
    item.className = "todo";
  
    const label = document.createElement("label");
    label.className = "container";
    if(task.checked) {
      label.innerHTML = `<del>${task.description}</del>`;
    } else {
      label.innerHTML = task.description;
    }
  
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
  
    const span = document.createElement("span");
    span.className = "checkmark";
    
    const button = document.createElement("div");
    button.className = "remove-btn";
    button.innerHTML = "X";
    button.addEventListener('click', e => {
      this.removeTask(numTask);
    });
  
    label.appendChild(checkbox);
    label.appendChild(span);
  
    item.appendChild(label);
    item.appendChild(button);

    return item;
  }

}

/*
function renderTaskList(parent, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    parent.appendChild(renderOneTask(tasks[i], i));
  }
  /*
  tasks.forEach((task) => {
    parent.appendChild(renderOneTask(task, ));
  });
}*/

function renderOneTask(task, numTask) {
  const item = document.createElement("div");
  item.className = "todo";

  const label = document.createElement("label");
  label.className = "container";
  label.innerHTML = task.description;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.checked;
  checkbox.addEventListener('click', e => {
    updateTask(numTask);
  });

  const span = document.createElement("span");
  span.className = "checkmark";
  
  const button = document.createElement("div");
  button.className = "remove-btn";
  button.innerHTML = "X";
  button.addEventListener('click', e => {
    removeTask(numTask);
  });

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
