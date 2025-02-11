import React from 'react';
import { useRouter } from 'next/router';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/solid';

const Header = ({ onClear, title }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="w-full max-w-2xl flex items-end justify-between pb-2 border-b border-[rgba(48,80,125,0.3)] mb-6">
      <div className="flex space-x-3">
        <button
          onClick={() => router.push('/')}
          className={`flex flex-col items-center space-y-2 focus:outline-none ${
            currentPath === '/'
              ? 'text-[rgba(48,80,125,1)] font-semibold'
              : 'text-gray-500'
          }`}
        >
          <span className="text-sm md:text-base">Tasks</span>
          <div
            className={`rounded-lg flex items-center justify-center w-11 h-11 transition-all ${
              currentPath === '/' ? 'bg-[rgba(106,108,224,1)]' : 'bg-gray-300'
            }`}
          >
            <CalendarDaysIcon className="w-10 h-10 text-white" />
          </div>
        </button>

        <button
          onClick={() => router.push('/history')}
          className={`flex flex-col items-center space-y-2 focus:outline-none ${
            currentPath === '/history'
              ? 'text-[rgba(48,80,125,1)] font-semibold'
              : 'text-gray-500'
          }`}
        >
          <span className="text-sm md:text-base">History</span>
          <div
            className={`rounded-lg flex items-center justify-center w-11 h-11 transition-all ${
              currentPath === '/history'
                ? 'bg-[rgba(106,108,224,1)]'
                : 'bg-gray-300'
            }`}
          >
            <ClockIcon className="w-10 h-10 text-white" />
          </div>
        </button>
      </div>

      <button
        onClick={onClear}
        className="text-[rgba(48,80,125,1)] underline font-medium text-sm hover:text-gray-700 transition"
      >
        {title}
      </button>
    </div>
  );
};

export default Header;
