import API_URL from "./constants.js";

export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
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

    return data;
  } catch (error) {
    return error;
  }
}

export async function signup(name, email, password, passwordConfirm) {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      passwordConfirm,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function logout() {
  const res = await fetch(`${API_URL}/users/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("You can't logout at the moment");
  await res.json();
}

export async function getCurrentUser() {
  const jwt = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      // credentials: "include",
    });

    const { data } = await res.json();

    console.log(res);

    return data;
  } catch (error) {
    return error;
  }
}

export async function updateCurrentUser() {
  const formData = new FormData();
  formData.append("avatar", avatarImg.files[0]);

  const res = await fetch(`${API_URL}/users/updateMe`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();

  return data;
}
