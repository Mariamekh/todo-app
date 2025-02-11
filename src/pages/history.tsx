import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHistoryList,
  clearHistory,
  removeTodoListItem,
} from '../services/api';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';

const History = () => {
  const queryClient = useQueryClient();

  const { data: completedTasks, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: getHistoryList,
  });

  const clearMutation = useMutation({
    mutationFn: clearHistory,
    onSuccess: () => queryClient.invalidateQueries(['history']),
  });

  const deleteMutation = useMutation({
    mutationFn: removeTodoListItem,
    onSuccess: () => queryClient.invalidateQueries(['history']),
  });

  return (
    <div className="min-h-screen bg-[rgba(232,241,253,1)] flex flex-col items-center px-4 md:px-10 py-6">
      <Header title={'Clear History'} onClear={() => clearMutation.mutate()} />

      <div className="w-full max-w-2xl">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="
                w-full max-w-2xl 
                grid gap-6 
                grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
                justify-items-center
                items-start
            "
          >
            {completedTasks.map((task) => (
              <TaskCard
                isHistory
                key={task.id}
                task={task}
                onDelete={() => deleteMutation.mutate(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History
