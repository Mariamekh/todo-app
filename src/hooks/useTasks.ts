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
import toast from 'react-hot-toast';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const clearMutation = useMutation({
    mutationFn: clearTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('All tasks cleared!');
    },
    onError: () => toast.error('Failed to clear tasks'),
  });

  const addMutation = useMutation({
    mutationFn: async (task: Task) =>
      addTodoList({ title: task.title, description: task.description ?? '' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('Task added successfully!');
    },
    onError: () => toast.error('Failed to add task'),
  });

  const editMutation = useMutation({
    mutationFn: async (task: Task) =>
      editTodoList(task.id, task.title, task.description),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('Task updated!');
    },
    onError: () => toast.error('Failed to edit task'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => removeTodoListItem(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('Task deleted!');
    },
    onError: () => toast.error('Failed to delete task'),
  });

  const markAsDoneMutation = useMutation({
    mutationFn: async (taskId: number) => markAsDone(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('Task marked as done!');
    },
    onError: () => toast.error('Failed to mark task as done'),
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
