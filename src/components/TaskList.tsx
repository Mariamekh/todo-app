import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAsDone, removeTodoListItem, editTodoList } from '../services/api';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const TaskList = ({ tasks }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const editMutation = useMutation({
    mutationFn: async (task) => {
      if (!task.id) throw new Error('Task ID is missing!');
      return editTodoList(task.id, task.title, task.description);
    },
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const deleteMutation = useMutation({
    mutationFn: removeTodoListItem,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const markAsDoneMutation = useMutation({
    mutationFn: markAsDone,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSave = async (task) => {
    if (task.id) {
      await editMutation.mutateAsync(task);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="
    w-full max-w-2xl 
    grid gap-6 
    grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
    justify-items-center
    items-start
  "
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={() => deleteMutation.mutate(task.id)}
            onMarkCompleted={() => markAsDoneMutation.mutate(task.id)}
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={taskToEdit}
      />
    </>
  );
};

export default TaskList;
