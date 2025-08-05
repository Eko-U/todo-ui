const loginBtn = document.querySelector(".btn-login");
const el_login = document.querySelector(".icon-eye-login");
const el2_login = document.querySelector(".icon-eye-off-login");
const password_login_el = document.querySelector(".password-login");
const errEl = document.querySelector(".error");

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

async function login(email, password) {
  errEl.classList.add("hidden");

  const res = await fetch("http://127.0.0.1:3033/api/v1/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  localStorage.setItem("login", true);

  if (!res.ok) {
    errEl.classList.toggle("hidden");
    errEl.textContent = `${data.message}`;

    return null;
  }

  window.location.href = "/pages/todos.html";
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

    await login(email, password);
  });
}
