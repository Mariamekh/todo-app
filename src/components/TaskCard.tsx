import React, { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onMarkCompleted,
  isHistory = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[rgba(246,250,255,1)] rounded-lg shadow-md w-full max-w-[480px] flex flex-col p-4 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 w-full">
        <h3
            className="font-poppins font-medium text-[rgba(48,80,125,1)] text-lg md:text-xl truncate w-[85%] md:w-[90%] lg:w-[82%] break-words leading-tight"
            title={task.title} 
          >
            {task.title}
          </h3>

          {isHistory && !expanded && (
            <span className="text-[rgba(108,134,168,1)] flex items-center space-x-1 text-xs md:text-sm font-medium font-poppins">
              <CheckCircleIcon className="w-6 h-6 font-bold text-[rgba(61,203,101,1)]" />
            </span>
          )}
        </div>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`}
      >
        <p className="bg-[rgba(232,241,253,1)] text-[rgba(108,134,168,1)] font-medium text-sm md:text-base p-2 rounded-md font-poppins shadow-[inset_1px_1px_4px_0px_rgba(48,80,125,0.25)]">
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-3">
          {!isHistory && (
            <button
              onClick={() => onEdit(task)}
              className="hover:scale-105 transition"
            >
              <PencilIcon className="w-5 h-5 text-[rgba(55,47,47,1)]" />
            </button>
          )}
          {!isHistory || (isHistory && expanded) ? (
            <button
              onClick={() => onDelete(task.id)}
              className="hover:scale-105 transition"
            >
              <TrashIcon className="w-5 h-5 text-[rgba(244,134,134,1)]" />
            </button>
          ) : null}
        </div>

        {isHistory && expanded ? (
          <span className="text-[rgba(108,134,168,1)] flex items-center space-x-1 text-xs md:text-sm font-medium font-poppins">
            <span>Completed</span>
            <CheckCircleIcon className="w-6 h-6 font-bold text-[rgba(61,203,101,1)]" />
          </span>
        ) : !isHistory ? (
          <button
            onClick={() => onMarkCompleted(task.id)}
            className="text-[rgba(108,134,168,1)] flex items-center space-x-1 hover:text-opacity-80 transition text-xs md:text-sm font-medium font-poppins"
          >
            <span>Mark completed</span>
            <CheckCircleIcon className="w-6 h-6 font-bold text-[rgba(61,203,101,1)]" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TaskCard;
