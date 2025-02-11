import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodoList, addTodoList, clearTodoList } from '../services/api';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import Header from '../components/Header';

export default function Home() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodoList,
    staleTime: 0,
  });

  const mutation = useMutation({
    mutationFn: addTodoList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSave = async (task) => {
    console.log('Saving task:', task);
    await mutation.mutateAsync(task);
    setIsModalOpen(false);
  };

  const clearMutation = useMutation({
    mutationFn: clearTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  return (
    <div className="min-h-screen bg-[rgba(232,241,253,1)] flex flex-col items-center px-4 md:px-10 py-6">
      <Header
        title={'Clear all Tasks'}
        onClear={() => clearMutation.mutate()}
      />
      <div className="w-full max-w-2xl">
        {isLoading ? <p>Loading...</p> : <TaskList tasks={tasks} />}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="
          bg-[rgba(106,108,224,1)] text-white p-5 rounded-full
          fixed bottom-8 left-1/2 transform -translate-x-1/2 
          text-2xl shadow-lg hover:bg-blue-600 transition-all duration-300
          w-16 h-16 flex items-center justify-center
        "
      >
        +
      </button>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
