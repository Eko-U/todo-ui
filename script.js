import { getCurrentUser } from "./api/apiUser.js";
import { AVATAR_URL } from "./api/constants.js";

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
console.log(Boolean(isLoggedIn));
if (Boolean(isLoggedIn))
  (async function () {
    try {
      const data = await getCurrentUser();

      console.log(data);

      username.textContent = data?.name;
      navLogin.classList.add("hidden");
      navSignup.classList.add("hidden");
      navLogout.classList.remove("hidden");
      navUserBox.classList.remove("hidden");
      dummyImg.style.display = "none";
      avatar.style.display = "block";

      avatar.src = `${AVATAR_URL}\\${data.avatar}`;
    } catch (error) {
      return;
    }
  })();

if (btnLogout)
  btnLogout.addEventListener("click", async function (e) {
    e.preventDefault();

    await logout();
  });
