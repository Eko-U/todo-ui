import { getCurrentUser, logout } from "./api/apiUser.js";
import { AVATAR_URL } from "./api/constants.js";

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

if (btnLogout)
  btnLogout.addEventListener("click", async function (e) {
    e.preventDefault();

    const isLogout = await logout();
    if (isLogout) localStorage.clear();
    window.location.href = "/";
  });
