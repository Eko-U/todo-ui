import { AVATAR_URL } from "../api/constants.js";

const btnUser = document.querySelector(".btn-update-user");
const avatarImg = document.querySelector("#avatar");
const email = document.querySelector(".form__input--email");
const user_name = document.querySelector(".form__input--username");
const avatar_about = document.querySelector(".avatar-about-img");

const dummyAvatarImg = document.querySelector(".person-circle-outline-about");

const isLoggedIn = localStorage.getItem("login");

if (Boolean(isLoggedIn))
  (async function () {
    try {
      const data = await getCurrentUser();

      email.value = data.email;
      user_name.value = data.name;

      avatar_about.style.display = "block";
      avatar_about.src = `${AVATAR_URL}/img/avatars/${data.avatar}`;

      avatar_about.style.display = "block !important";

      user_name.textContent = name;
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

(async function () {
  try {
    const res = await fetch("http://127.0.0.1:3033/api/v1/users/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return;

    const { data } = await res.json();

    email.value = data.email;
    user_name.value = data.name;

    data.avatar ? (dummyAvatarImg.style.display = "none") : "";

    avatar_about.style.display = "block";
    avatar_about.src = `http://127.0.0.1:3033/img/avatars/${data.avatar}`;

    avatar_about.style.display = "block !important";

    user_name.textContent = name;
    navLogin.classList.add("hidden");
    navSignup.classList.add("hidden");
    navLogout.classList.remove("hidden");
    navUserBox.classList.remove("hidden");
  } catch (error) {
    return;
  }
})();

async function fn() {
  const formData = new FormData();
  formData.append("avatar", avatarImg.files[0]);

  const res = await fetch(`http://127.0.0.1:3033/api/v1/users/updateMe`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  data;
}

btnUser.addEventListener("click", async function (e) {
  e.preventDefault();
  await fn();
});
