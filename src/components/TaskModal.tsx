import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Task } from '../types';
import { useTasks } from '@/hooks/useTasks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addTask, editTask } = useTasks();

  useEffect(() => {
    setTitle(initialData?.title ?? '');
    setDescription(initialData?.description ?? '');
  }, [initialData]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.slice(0, 40);
      setTitle(input);
      setIsTitleValid(input.trim().length > 0);
    },
    [],
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value.slice(0, 180));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (!title.trim() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (initialData) {
        await editTask(initialData);
      } else {
        await addTask({
          title: title.trim(),
          description: description.trim(),
        });
      }
      onClose();

      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Task save failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    title,
    addTask,
    editTask,
    description,
    onClose,
    initialData,
    isSubmitting,
  ]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[rgba(246,250,255,1)] p-5 rounded-lg shadow-lg w-[min(400px,85vw)] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="text-[rgba(48,80,125,1)] text-sm font-bold font-poppins leading-[18px] mb-4 text-center">
          {initialData ? 'Edit Task' : 'Create Task'}
        </h2>
        <div className="relative mb-3">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={40}
            className={`w-full border-[1px] ${
              isTitleValid ? 'border-[rgba(106,108,224,1)]' : 'border-red-500'
            } pt-4 pl-3 pr-2 pb-1 rounded-md bg-[rgba(255,254,252,1)] focus:outline-none focus:ring-1 ${
              isTitleValid
                ? 'focus:ring-[rgba(106,108,224,1)]'
                : 'focus:ring-red-500'
            } text-base`}
          />
          <label
            className={`absolute left-3 transition-all ${
              title.length > 0
                ? 'text-xs text-[rgba(108,134,168,1)] top-1'
                : 'text-sm text-gray-400 top-3'
            }`}
          >
            Task Name
          </label>
        </div>
        <textarea
          placeholder="Type task details here..."
          value={description}
          onChange={handleDescriptionChange}
          maxLength={180}
          className="text-[rgba(108,134,168,1)] font-medium text-sm md:text-base p-2 rounded-md font-poppins w-full border-[1px] border-gray-300 bg-[rgba(232,241,253,1)] shadow-[inset_1px_1px_4px_0px_rgba(48,80,125,0.25)] focus:outline-none focus:ring-1 focus:ring-gray-400 h-28 resize-none text-base mb-2"
        />
        <button
          onClick={handleSubmit}
          disabled={!isTitleValid || isSubmitting}
          className={`w-full py-2 rounded-md font-poppins font-medium text-base transition-all ${
            isTitleValid
              ? 'bg-[rgba(106,108,224,1)] text-white hover:bg-[rgba(86,88,204,1)]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
