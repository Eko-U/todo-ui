function dateFormated(dateToFormat) {
  const date = new Date(dateToFormat);
  const finalDate = `${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }/${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }/${date.getFullYear()} `;

  return finalDate;
}

const username = document.querySelector(".nav-username");
const navLogin = document.querySelector(".nav-login");
const navSignup = document.querySelector(".nav-signup");
const navLogout = document.querySelector(".nav-logout");
const btnLogout = document.querySelector(".nav-logout");

const addTodoForm = document.querySelector(".form-add-task");

const avatar = document.querySelector(".avatar-img");

const userEl = document.querySelector(".nav-username");
const navUserBox = document.querySelector(".nav-user");
const dummyImg = document.querySelector(".person-circle-outline");

const isLoggedIn = localStorage.getItem("login");

if (isLoggedIn)
  (async function () {
    console.log("tessting....");
    try {
      const res = await fetch("http://127.0.0.1:3033/api/v1/users/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) return;

      const { data } = await res.json();

      username.textContent = data?.name;
      navLogin.classList.add("hidden");
      navSignup.classList.add("hidden");
      navLogout.classList.remove("hidden");
      navUserBox.classList.remove("hidden");
      dummyImg.style.display = "none";
      avatar.style.display = "block";
      avatar.src = `http://127.0.0.1:3033\\img\\avatars\\${data.avatar}`;
    } catch (error) {
      return;
    }
  })();

async function userDetails(email, password) {
  const res = await fetch("http://127.0.0.1:3033/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  window.location.reload();
}

async function logout() {
  const res = await fetch("http://127.0.0.1:3033/api/v1/users/logout", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  localStorage.clear();
  console.log(data);
  window.location.reload();
}

if (btnLogout)
  btnLogout.addEventListener("click", async function (e) {
    e.preventDefault();

    console.log("clicking");

    await logout();
  });
