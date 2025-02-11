const API_URL = '/api/todos';

export const getTodoList = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTodoList = async (title: string, description: string) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
};

export const removeTodoListItem = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const editTodoList = async (
  id: number,
  title: string,
  description: string
) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
};

export const clearTodoList = async () => {
  await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const markAsDone = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
};
