function dateFormated(dateToFormat) {
  const date = new Date(dateToFormat);
  const finalDate = `${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }/${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }/${date.getFullYear()} `;

  return finalDate;
}

const jwt = localStorage.getItem("jwt");

/** 
const btn = document.querySelector('.btn');


const dueDate =  document.querySelector('.form__input--task-due-date')
const title = document.querySelector('.form__input--task-name')
const description =  document.querySelector('.form-textarea-add')



const now = new Date();
const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
dueDate.min = local.toISOString();



if(btn) btn.addEventListener('click', async (e) => {
  e.preventDefault();
  btn.textContent = 'loading'

  

if(dueDate.value >= dueDate.min) console.log("You can use this date")
if(dueDate.value < dueDate.min) console.log("You cannot use this date")

  console.log(dueDate)
  const data = await fetch('http://127.0.0.1:3033/api/v1/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value, description: description.value,
      dueDate: dueDate.value
    })
  })

  const result = await data.json();
  console.log(result);

  title.value = '',
  description.value = ''
  dueDate.value = ''
  btn.textContent = 'Add task'
})


const el_login = document.querySelector('.icon-eye-login');
const el2_login = document.querySelector('.icon-eye-off-login');
const password_login_el = document.querySelector('.password-login')

el_login.addEventListener('click', function(e) {
 el_login.classList.add('hidden')
 el2_login.classList.remove('hidden')

 password_login_el.type = 'text';
})

if(el2_login){
  el2_login.addEventListener('click', function(e) {
    el_login.classList.remove('hidden')
    el2_login.classList.add('hidden')

    password_login_el.type = 'password';
  })
}










const heading = document.querySelector('.heading')
const right = document.querySelector('.right')
const left = document.querySelector('.left')



heading.addEventListener('dragstart', ev => {
  ev.target.style.border = '3px solid #000';
  ev.target.style.backgroundColor = '#fff';
  console.log(ev.target.id)
  const data = ev.dataTransfer.setData('application/my-app',ev.target.id);
  ev.dataTransfer.effectAllowed = 'move';
})


right.addEventListener('dragover', (ev) => {
  ev.preventDefault();

  ev.dataTransfer.dropEffect = 'move';

})

right.addEventListener('drop', (ev) => {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('application/my-app');
  
  const heading = document.getElementById(data)
  ev.target.appendChild(heading)
})


left.addEventListener('dragover', (ev) => {
  ev.preventDefault();

  ev.dataTransfer.dropEffect = 'move';

})

left.addEventListener('drop', (ev) => {
  ev.preventDefault();

  const data = ev.dataTransfer.getData('application/my-app');
  ev.target.appendChild(document.getElementById(data))
})
*/

function updateTodoTask(taskId) {
  async function fn() {
    const res = await fetch(`http://127.0.0.1:3033/api/v1/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        isCompleted: false,
      }),
    });

    const data = await res.json();
    console.log(data);
  }

  fn();
}

function deleteTodoTask(taskId) {
  async function fn() {
    const res = await fetch(`http://127.0.0.1:3033/api/v1/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = await res.json();
  }

  fn();
}

const todoTaskListsContainer = document.querySelector(".todo-task-lists");
const todoTaskUpdate = document.querySelector(".todo-task-update");

if (todoTaskListsContainer)
  todoTaskListsContainer.addEventListener("click", function (e) {
    e.preventDefault();

    const taskItem = e.target.closest(".todo-task-item");

    if (!taskItem) return;

    const taskId = taskItem.getAttribute("data-task-id");

    if (e.target.classList.contains("todo-task-update")) {
      updateTodoTask(taskId);
    }

    if (e.target.classList.contains("todo-task-delete")) {
      deleteTodoTask(taskId);
    }

    window.location.reload();
  });

(async function () {
  const noTodoTaskEl = document.querySelector(".no-todo-tasks");
  const todoTaskListsContainer = document.querySelector(".todo-task-lists");

  const res = await fetch("http://127.0.0.1:3033/api/v1/tasks/", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await res.json();
  if (!data.length) {
    if (todoTaskListsContainer)
      todoTaskListsContainer.style.justifyContent = "center";
    if (noTodoTaskEl) noTodoTaskEl.classList.toggle("hidden");

    return;
  }
  data.data.map((task) => {
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
        <p class="due-date-container"><span class="${
          isDue ? "due-date" : ""
        }"><ion-icon name="alarm-outline"></ion-icon>${dueDate}</span> <span><ion-icon name="calendar-outline"></ion-icon>${createdDate}</span></pclass=>
      </div>

      <div class="todo-task-operation">
        <span class="todo-task-update">🖋</span>
        <span class="todo-task-delete">✖</span>
      </div>
    </li>`
    );
  });

  if (!res.ok) throw new Error(data.message);
})();

const navLogin = document.querySelector(".nav-login");
const navSignup = document.querySelector(".nav-signup");
const navLogout = document.querySelector(".nav-logout");

const btnLogout = document.querySelector(".nav-logout");

if (jwt) {
  navLogin.style.display = "none";
  navSignup.style.display = "none";
  navLogout.classList.remove("hidden");
}

if (!jwt) navLogout.classList.add("hidden");

const loginBtn = document.querySelector(".btn-login");

async function login(email, password) {
  console.log(email, password);
  const res = await fetch("http://127.0.0.1:3033/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  localStorage.setItem("jwt", data.token);

  window.location.reload();
}

if (jwt) {
  const userEl = document.querySelector(".nav-username");

  (async function () {
    const res = await fetch("http://127.0.0.1:3033/api/v1/users/me", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    // if (!res.ok) return;

    const data = await res.json();
    console.log(data);

    userEl.textContent = data.data.name;
  })();
}

async function userDetails(email, password) {
  const res = await fetch("http://127.0.0.1:3033/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  localStorage.setItem("jwt", data.token);

  window.location.reload();
}

async function logout() {
  const res = await fetch("http://127.0.0.1:3033/api/v1/users/logout", {
    method: "GET",
  });

  const data = await res.json();
  localStorage.clear();

  window.location.reload();
}

if (loginBtn) {
  loginBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password-login").value;

    await login(email, password);
  });
}

if (btnLogout)
  btnLogout.addEventListener("click", async function (e) {
    e.preventDefault();

    await logout();
  });

const btnAddTodo = document.querySelector(".btn-add-todo");
const addTodoForm = document.querySelector(".form-add-task");
if (btnAddTodo)
  btnAddTodo.addEventListener("click", function (e) {
    e.preventDefault();

    addTodoForm.classList.toggle("hidden");
    btnAddTodo.textContent = "";
    btnAddTodo.insertAdjacentHTML(
      "afterbegin",
      `<ion-icon name="close-outline"></ion-icon> <span>Close Form</span>`
    );

    if (addTodoForm.classList.contains("hidden")) {
      btnAddTodo.textContent = "";
      btnAddTodo.insertAdjacentHTML(
        "afterbegin",
        `<ion-icon name="add-outline"></ion-icon> <span>New Task</span>`
      );
    }
  });
