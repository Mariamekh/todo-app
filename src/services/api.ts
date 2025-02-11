const API_URL = 'http://localhost:3000/api/todos';
const HISTORY_URL = 'http://localhost:3000/api/history';

export const getTodoList = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const addTodoList = async (newTask: {
  title: string;
  description: string;
}) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });

  if (!res.ok) throw new Error('Failed to add task');
  return res.json();
};

export const removeTodoListItem = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete task: ${errorText}`);
  }

  return res.json();
};

export const editTodoList = async (id, title, description) => {
  if (!id) throw new Error('Edit failed: Task ID is missing!');

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) throw new Error('Failed to edit task');
  return res.json();
};

export const clearTodoList = async () => {
  const res = await fetch(`${API_URL}/clear`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Failed to clear tasks: ${res.statusText}`);
  }

  return res.json();
};

export const markAsDone = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: 1 }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to mark as done: ${errorText}`);
  }

  return res.json();
};

export const getHistoryList = async () => {
  const response = await fetch(`${HISTORY_URL}`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
};

export const clearHistory = async () => {
  const res = await fetch(`${HISTORY_URL}/clear`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to clear history');
  return res.json();
};
