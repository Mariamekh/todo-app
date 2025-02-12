import React from 'react';

const TaskCardSkeleton: React.FC = () => {
  return (
    <div
      className="
        bg-[rgba(246,250,255,1)] rounded-lg shadow-md 
        w-full max-w-[480px] 
        flex flex-col p-4 transition-all duration-300
        shadow-[0px_2px_8px_0px_rgba(106,108,224,0.26)]
        animate-pulse
      "
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center w-full">
          <div className="bg-gray-300 h-5 w-3/4 rounded-md"></div>
        </div>
        <div className="bg-gray-300 h-5 w-6 rounded-md"></div>
      </div>
      <div className="mt-2">
        <div className="bg-gray-300 h-4 w-full rounded-md mb-2"></div>
        <div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-3">
          <div className="bg-gray-300 h-5 w-5 rounded-md"></div>
          <div className="bg-gray-300 h-5 w-5 rounded-md"></div>
        </div>

        <div className="bg-gray-300 h-5 w-6 rounded-md"></div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
