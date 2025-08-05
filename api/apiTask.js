export function updateTodoTask(taskId) {
  async function fn() {
    const getResTask = await fetch(
      `http://127.0.0.1:3033/api/v1/tasks/${taskId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const getResTaskData = await getResTask.json();

    const res = await fetch(`http://127.0.0.1:3033/api/v1/tasks/${taskId}`, {
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
    const res = await fetch(`http://127.0.0.1:3033/api/v1/tasks/${taskId}`, {
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
