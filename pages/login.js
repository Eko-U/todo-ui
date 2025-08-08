import { getCurrentUser, login } from "../api/apiUser.js";

const loginBtn = document.querySelector(".btn-login");
const el_login = document.querySelector(".icon-eye-login");
const el2_login = document.querySelector(".icon-eye-off-login");
const password_login_el = document.querySelector(".password-login");
const errEl = document.querySelector(".error");

if (Boolean(localStorage.getItem("login"))) {
  window.location.href = "/pages/todos.html";
}

el_login.addEventListener("click", function (e) {
  el_login.classList.add("hidden");
  el2_login.classList.remove("hidden");

  password_login_el.type = "text";
});

if (el2_login) {
  el2_login.addEventListener("click", function (e) {
    el_login.classList.remove("hidden");
    el2_login.classList.add("hidden");

    password_login_el.type = "password";
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    errEl.classList.add("hidden");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password-login").value;

    if (!email || !password) {
      errEl.classList.remove("hidden");
      errEl.textContent = `Email or Paswword can't not be empty. Please insert your email and password`;
      return null;
    }

    errEl.classList.add("hidden");

    const data = await login(email, password);

    if (data.status === "error" || data.status === "fail" || data.error) {
      errEl.classList.toggle("hidden");
      errEl.textContent = `${data.message}`;

      return null;
    }

    localStorage.setItem("login", true);
    localStorage.setItem("jwt", data.token);

    window.location.href = "/pages/todos.html";
  });
}
