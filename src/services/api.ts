import { Task } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const HISTORY_URL = process.env.NEXT_PUBLIC_HISTORY_URL;

if (!API_URL || !HISTORY_URL) {
  throw new Error(
    'Missing environment variables: Ensure NEXT_PUBLIC_API_URL and NEXT_PUBLIC_HISTORY_URL are set.',
  );
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const apiRequest = async <T>(
  url: string,
  method: HTTPMethod = 'GET',
  userId: string,
  body?: unknown,
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Network Request Failed:', error);
    throw new Error('A network error occurred. Please try again.');
  }
};

export const getTodoList = async (userId: string): Promise<Task[]> =>
  apiRequest<Task[]>(`${API_URL}?userId=${userId}`, 'GET', userId);

export const addTodoList = async (
  userId: string,
  task: Omit<Task, 'id'>,
): Promise<Task> => apiRequest<Task>(API_URL, 'POST', userId, task);

export const removeTodoListItem = async (
  userId: string,
  id: number,
): Promise<{ success: boolean }> =>
  apiRequest(`${API_URL}/${id}`, 'DELETE', userId);

export const editTodoList = async (
  userId: string,
  id: number,
  title: string,
  description?: string,
): Promise<Task> =>
  apiRequest<Task>(`${API_URL}/${id}`, 'PUT', userId, { title, description });

export const clearTodoList = async (
  userId: string,
): Promise<{ success: boolean }> =>
  apiRequest(`${API_URL}/clear`, 'DELETE', userId);

export const markAsDone = async (userId: string, id: number): Promise<Task> =>
  apiRequest<Task>(`${API_URL}/${id}`, 'PATCH', userId, { completed: true });

export const getHistoryList = async (userId: string): Promise<Task[]> =>
  apiRequest<Task[]>(`${HISTORY_URL}?userId=${userId}`, 'GET', userId);

export const clearHistory = async (
  userId: string,
): Promise<{ success: boolean }> =>
  apiRequest(`${HISTORY_URL}/clear`, 'DELETE', userId);

export const deleteHistoryTask = async (
  userId: string,
  id: number,
): Promise<{ success: boolean }> =>
  apiRequest(`${HISTORY_URL}/${id}`, 'DELETE', userId);
