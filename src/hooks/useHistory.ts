import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHistoryList,
  clearHistory,
  deleteHistoryTask,
} from '../services/api';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';

export const useHistory = () => {
  const queryClient = useQueryClient();
  const { userId } = useUser();

  const clearMutation = useMutation({
    mutationFn: () => clearHistory(userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
      toast.success('History cleared!');
    },
    onError: () => toast.error('Failed to clear history'),
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: number) => deleteHistoryTask(userId!, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
      toast.success('Task removed from history!');
    },
    onError: () => toast.error('Failed to delete task'),
  });

  return {
    fetchTasks: () => getHistoryList(userId!),
    onClear: () => clearMutation.mutate(),
    deleteTask: (taskId: number) => deleteMutation.mutate(taskId),
  };
};
