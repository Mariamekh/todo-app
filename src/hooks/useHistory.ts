import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getHistoryList, clearHistory } from '../services/api';

export const useHistory = () => {
  const queryClient = useQueryClient();

  const clearMutation = useMutation({
    mutationFn: clearHistory,
    onSuccess: () => queryClient.invalidateQueries(['history']),
  });

  return {
    fetchTasks: getHistoryList,
    onClear: () => clearMutation.mutate(),
  };
};
