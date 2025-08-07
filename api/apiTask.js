import API_URL from "./constants.js";

export function updateTodoTask(taskId) {
  async function fn() {
    const getResTask = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "GET",
      credentials: "include",
    });

    const getResTaskData = await getResTask.json();

    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        isCompleted: !getResTaskData.data.isCompleted,
      }),
    });

    window.location.reload();
  }

  fn();
}

export function deleteTodoTask(taskId) {
  async function fn() {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    window.location.reload();
  }

  fn();
}
