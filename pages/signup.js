import { signup } from "../api/apiUser";

const el_signup = document.querySelector(".icon-eye-signup");
const el2_signup = document.querySelector(".icon-eye-off-signup");
const password_signup_el = document.querySelector(".password-signup-first");

const btn_signup = document.querySelector(".btn-signup");

el_signup.addEventListener("click", function (e) {
  el_signup.classList.add("hidden");
  el2_signup.classList.remove("hidden");

  password_signup_el.type = "text";
});

if (el2_signup) {
  el2_signup.addEventListener("click", function (e) {
    el_signup.classList.remove("hidden");
    el2_signup.classList.add("hidden");

    password_signup_el.type = "password";
  });
}

const el_confirm = document.querySelector(".icon-eye-confirm");
const el2_confirm = document.querySelector(".icon-eye-off-confirm");
const password_confirm_el = document.querySelector(".password-signup-confirm");

el_confirm.addEventListener("click", function (e) {
  el_confirm.classList.add("hidden");
  el2_confirm.classList.remove("hidden");

  password_confirm_el.type = "text";
});

if (el2_confirm) {
  el2_confirm.addEventListener("click", function (e) {
    el_confirm.classList.remove("hidden");
    el2_confirm.classList.add("hidden");

    password_confirm_el.type = "password";
  });
}

btn_signup.addEventListener("click", async function (e) {
  e.preventDefault();

  const name = document.querySelector(".form__input--username");
  const email = document.querySelector(".form__input--email");
  const password = document.querySelector(".password-signup-first");
  const passwordConfirm = document.querySelector(".password-signup-confirm");

  await signup(name.value, email.value, password.value, passwordConfirm.value);
});
