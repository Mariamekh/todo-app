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
import { useUser } from '@/context/UserContext';

export const useTasks = () => {
  const queryClient = useQueryClient();
  const { userId } = useUser();

  if (!userId) {
    throw new Error('User ID is missing');
  }
  const clearMutation = useMutation({
    mutationFn: clearTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('All tasks cleared!');
    },
    onError: () => toast.error('Failed to clear tasks'),
  });

  const addMutation = useMutation({
    mutationFn: async (task: Omit<Task, 'id'>) =>
      addTodoList(userId, {
        title: task.title,
        description: task.description ?? '',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task added successfully!');
    },
    onError: () => toast.error('Failed to add task'),
  });

  const editMutation = useMutation({
    mutationFn: async (task: Task) =>
      editTodoList(userId, task.id, task.title, task.description ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task updated!');
    },
    onError: () => toast.error('Failed to edit task'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => removeTodoListItem(userId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task deleted!');
    },
    onError: () => toast.error('Failed to delete task'),
  });

  const markAsDoneMutation = useMutation({
    mutationFn: async (taskId: number) => markAsDone(userId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task marked as done!');
    },
    onError: () => toast.error('Failed to mark task as done'),
  });

  return {
    fetchTasks: () => getTodoList(userId!),
    onClear: () => clearMutation.mutate(userId),
    addTask: (task: Omit<Task, 'id'>) => addMutation.mutate(task),
    editTask: (task: Task) => editMutation.mutate(task),
    deleteTask: (taskId: number) => deleteMutation.mutate(taskId),
    markAsDoneTask: (taskId: number) => markAsDoneMutation.mutate(taskId),
  };
};
