import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHistoryList,
  clearHistory,
  deleteHistoryTask,
} from '../services/api';
import toast from 'react-hot-toast';

export const useHistory = () => {
  const queryClient = useQueryClient();

  const clearMutation = useMutation({
    mutationFn: clearHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
      toast.success('History cleared!');
    },
    onError: () => toast.error('Failed to clear history'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => deleteHistoryTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
      toast.success('Task removed from history!');
    },
    onError: () => toast.error('Failed to delete task'),
  });

  return {
    fetchTasks: getHistoryList,
    onClear: () => clearMutation.mutate(),
    deleteTask: (taskId: number) => deleteMutation.mutate(taskId),
  };
};
