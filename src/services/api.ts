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
  body?: unknown,
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
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

export const getTodoList = async (): Promise<Task[]> =>
  apiRequest<Task[]>(API_URL);

export const addTodoList = async (task: Omit<Task, 'id'>): Promise<Task> =>
  apiRequest<Task>(API_URL, 'POST', task);

export const removeTodoListItem = async (
  id: number,
): Promise<{ success: boolean }> => apiRequest(`${API_URL}/${id}`, 'DELETE');

export const editTodoList = async (
  id: number,
  title: string,
  description: string,
): Promise<Task> =>
  apiRequest<Task>(`${API_URL}/${id}`, 'PUT', { title, description });

export const clearTodoList = async (): Promise<{ success: boolean }> =>
  apiRequest(`${API_URL}/clear`, 'DELETE');

export const markAsDone = async (id: number): Promise<Task> =>
  apiRequest<Task>(`${API_URL}/${id}`, 'PATCH', { completed: true });

export const getHistoryList = async (): Promise<Task[]> =>
  apiRequest<Task[]>(HISTORY_URL);

export const clearHistory = async (): Promise<{ success: boolean }> =>
  apiRequest(`${HISTORY_URL}/clear`, 'DELETE');
