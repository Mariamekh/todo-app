import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTodoList,
  clearTodoList,
  addTodoList,
  editTodoList,
  removeTodoListItem,
  markAsDone,
} from '../services/api';
import { Task } from '../types';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const clearMutation = useMutation({
    mutationFn: clearTodoList,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const addMutation = useMutation({
    mutationFn: async (task: Task) =>
      addTodoList({ title: task.title, description: task.description ?? '' }),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const editMutation = useMutation({
    mutationFn: async (task: Task) =>
      editTodoList(task.id, task.title, task.description),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => removeTodoListItem(taskId),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const markAsDoneMutation = useMutation({
    mutationFn: async (taskId: number) => markAsDone(taskId),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  return {
    fetchTasks: getTodoList,
    onClear: () => clearMutation.mutate(),
    addTask: (task: Task) => addMutation.mutate(task),
    editTask: (task: Task) => editMutation.mutate(task),
    deleteTask: (taskId: number) => deleteMutation.mutate(taskId),
    markAsDoneTask: (taskId: number) => markAsDoneMutation.mutate(taskId),
  };
};
