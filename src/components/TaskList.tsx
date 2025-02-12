import React, { useState, useCallback, useMemo } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';
import TaskCardSkeleton from './TaskCardSkeleton';

interface TaskListProps {
  tasks: Task[];
  isHistory: boolean;
  isLoading: boolean;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  isLoading,
  tasks,
  isHistory = false,
  onDelete,
}) => {
  const { markAsDoneTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>();

  const handleEdit = useCallback((task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }, []);

  const renderedTasks = useMemo(
    () =>
      tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          task={task}
          isHistory={isHistory}
          onEdit={handleEdit}
          onDelete={onDelete}
          onMarkCompleted={() => markAsDoneTask(task.id!)}
        />
      )),
    [tasks, isHistory, handleEdit, onDelete, markAsDoneTask],
  );

  return (
    <>
      <div className="w-full max-w-2xl grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 justify-items-center items-start">
        {isLoading
          ? [...Array(4)].map((_, i) => <TaskCardSkeleton key={i} />)
          : renderedTasks}
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={taskToEdit}
      />
    </>
  );
};

export default TaskList;
