import { updateTodoTask, deleteTodoTask } from "../api/apiTask.js";
import API_URL from "../api/constants.js";
import { dateFormated } from "../api/helper.js";

const todoTaskListCompletedContainer = document.querySelector(
  ".todo-task-lists-completed"
);
const todoTaskListsContainer = document.querySelector(".todo-task-lists");
const todoTaskListsCompletedContainer = document.querySelector(
  ".todo-task-lists-completed"
);

const todoTaskComplete = document.querySelector(".todo-task-completed");

const btnAddTodoTask = document.querySelector(".btn-add");
const btnShowTodoForm = document.querySelector(".btn-add-todo");
const formTodoAddTask = document.querySelector(".form-add-task");

const todoTaskUpdate = document.querySelector(".todo-task-update");
const todoTaskInput = document.querySelector(".todo-task-input");

const isLoggedIn = localStorage.getItem("login");
if (Boolean(isLoggedIn))
  (async function () {
    try {
      const data = await getCurrentUser();

      username.textContent = data?.name;
      navLogin.classList.add("hidden");
      navSignup.classList.add("hidden");
      navLogout.classList.remove("hidden");
      navUserBox.classList.remove("hidden");

      if (data.avatar.length === 0) {
        avatar.style.display = "none";
        dummyImg.style.display = "block";
      }

      if (data.avatar.length > 0) {
        avatar.src = `${AVATAR_URL}\\${data.avatar}`;
        avatar.style.display = "block";
        dummyImg.style.display = "none";
      }
    } catch (error) {
      return error;
    }
  })();

if (btnShowTodoForm)
  btnShowTodoForm.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      formTodoAddTask.classList.contains("hidden") ||
      !formTodoAddTask.classList.contains("hidden")
    ) {
      formTodoAddTask.classList.toggle("hidden");

      btnShowTodoForm.textContent = "";

      btnShowTodoForm.insertAdjacentHTML(
        "afterbegin",
        `${
          formTodoAddTask.classList.contains("hidden")
            ? ` <ion-icon name="add-outline"></ion-icon> <span>New Task</span>`
            : `<ion-icon name="close-outline"></ion-icon> <span>Close Form</span>`
        }`
      );
    }

    if (formTodoAddTask.classList.contains("hidden")) {
      const errEl = document.querySelector(".error");
      errEl.classList.add("hidden");
    }
  });

if (btnAddTodoTask)
  btnAddTodoTask.addEventListener("click", async (e) => {
    e.preventDefault();
    const dueDate = document.querySelector(".form__input--task-due-date");
    const title = document.querySelector(".form__input--task-name");
    const description = document.querySelector(".form-textarea-add");
    const errEl = document.querySelector(".error");

    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    dueDate.min = local.toISOString();

    btnAddTodoTask.textContent = "loading";
    errEl.classList.add("hidden");

    if (dueDate.value >= dueDate.min) console.log("You can use this date");
    if (dueDate.value < dueDate.min) console.log("You cannot use this date");

    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      errEl.classList.toggle("hidden");
      errEl.textContent = `${data.message}`;
      btnAddTodoTask.textContent = "Add task";
      return;
    }

    title.value = "";
    description.value = "";
    dueDate.value = "";

    btnAddTodoTask.textContent = "Add task";
    window.location.reload();
  });

if (todoTaskListsContainer || todoTaskListCompletedContainer) {
  todoTaskListsContainer.addEventListener("click", function (e) {
    const taskItem = e.target.closest(".todo-task-item");

    if (!taskItem) return;

    const taskId = taskItem.getAttribute("data-task-id");

    if (e.target.classList.contains("todo-task-update") || e.target.checked) {
      updateTodoTask(taskId);
    }

    if (e.target.classList.contains("todo-task-delete")) {
      deleteTodoTask(taskId);
    }
  });

  todoTaskListCompletedContainer.addEventListener("click", function (e) {
    const taskItem = e.target.closest(".todo-task-item");

    if (!taskItem) return;

    const taskId = taskItem.getAttribute("data-task-id");

    if (!e.target.checked) {
      updateTodoTask(taskId);
    }

    if (e.target.classList.contains("todo-task-delete")) {
      deleteTodoTask(taskId);
    }
  });
}

(async function () {
  const noTodoTaskEl = document.querySelector(".no-todo-tasks");
  const todoTaskListsContainer = document.querySelector(".todo-task-lists");

  const res = await fetch(`${API_URL}/tasks/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  const todoNotCompleted = data.data.filter((el) => el.isCompleted !== true);

  if (todoNotCompleted.length === 0) {
    if (todoTaskListsContainer)
      todoTaskListsContainer.style.justifyContent = "center";
    if (noTodoTaskEl) {
      console.log(noTodoTaskEl);
      noTodoTaskEl.classList.toggle("hidden");
      todoTaskListsContainer.style.padding = "10rem 3rem";
      noTodoTaskEl.insertAdjacentHTML(
        "afterbegin",
        `<p class="no-todo-tasks">
        You do not have any task now or past. Please try adding a task today, by
        click '+ new task' button above
        </p>`
      );
    }
  }

  data.data.map((task) => {
    if (task.isCompleted) return;

    const curDate = new Date(Date.now()).toISOString();
    const dueDate = dateFormated(task.dueDate);
    const createdDate = dateFormated(task.createdAt);

    const isDue = curDate > task.dueDate;

    return todoTaskListsContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="todo-task-item" data-task-id=${task._id}>
      <input type="checkbox" name="isCompleted"  class="todo-task-input">
      <div class="content">
        <h3>${task.title}</h3>
        <p>${task.description}</p>

        <p class="due-date-container">
          <span class=" class="${
            isDue ? "due-date" : ""
          }"> <span>due date:</span> <span>${dueDate}</span></span>
            <span> <span>created date:</span> <span>${createdDate}</span></span>
        </p>
      
      </div>

      <div class="todo-task-operation">
        <span class="todo-task-delete">✖</span>
      </div>
    </li>`
    );
  });

  const taskCompleted = data.data.filter((task) => task.isCompleted);
  console.log(taskCompleted);

  if (taskCompleted.length === 0) {
    console.log("testting...");
    todoTaskComplete.style.display = "none";
  }

  data.data.map((task) => {
    if (!task.isCompleted) return;

    const curDate = new Date(Date.now()).toISOString();
    const dueDate = dateFormated(task.dueDate);
    const createdDate = dateFormated(task.createdAt);

    const isDue = curDate > task.dueDate;

    return todoTaskListCompletedContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="todo-task-item ${
        isDue && !task.isCompleted ? "due-date" : "done"
      }" data-task-id=${task._id}>
      <input type="checkbox" name="isCompleted" checked  class="todo-task-input">
      <div class="content">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p class="due-date-container">
        <span class="${
          isDue && !task.isCompleted ? "due-date" : "done"
        }"><span>due date:</span> <span>${dueDate}</span></span>
            <span> <span>created date:</span> <span>${createdDate}</span></span>
      </div>

      <div class="todo-task-operation">
        <span class="todo-task-delete">✖</span>
      </div>
    </li>`
    );
  });

  if (!res.ok) throw new Error(data.message);
})();
