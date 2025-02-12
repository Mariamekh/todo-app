import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getHistoryList, clearHistory } from '../services/api';
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

  return {
    fetchTasks: getHistoryList,
    onClear: () => clearMutation.mutate(),
  };
};
