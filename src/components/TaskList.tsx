import React, { useState, useCallback, useMemo } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  isHistory?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isHistory = false }) => {
  const { addTask, editTask, deleteTask, markAsDoneTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleEdit = useCallback((task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(
    async (task: Task) => {
      if (task.id) {
        editTask(task);
      } else {
        addTask(task);
      }
      setIsModalOpen(false);
    },
    [editTask, addTask],
  );

  const renderedTasks = useMemo(
    () =>
      tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          task={task}
          isHistory={isHistory}
          onEdit={handleEdit}
          onDelete={() => deleteTask(task.id!)}
          onMarkCompleted={() => markAsDoneTask(task.id!)}
        />
      )),
    [tasks, isHistory, handleEdit, deleteTask, markAsDoneTask],
  );

  return (
    <>
      <div
        className="
        w-full max-w-2xl 
        grid gap-6 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
        justify-items-center items-start
      "
      >
        {renderedTasks}
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
