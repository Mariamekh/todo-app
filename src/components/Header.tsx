import React from 'react';
import { useRouter } from 'next/router';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  title: string;
  onClear: () => void;
}

const NavItem: React.FC<{ path: string; label: string; Icon: any }> = ({
  path,
  label,
  Icon,
}) => {
  const router = useRouter();
  const isActive = router.pathname === path;

  return (
    <button
      onClick={() => router.push(path)}
      className={`flex flex-col items-center space-y-2 transition-all ${
        isActive ? 'text-[rgba(48,80,125,1)] font-semibold' : 'text-gray-500'
      } focus:outline-none`}
    >
      <span className="text-sm md:text-base">{label}</span>
      <div
        className={`rounded-lg flex items-center justify-center w-11 h-11 ${
          isActive ? 'bg-[rgba(106,108,224,1)]' : 'bg-gray-300'
        }`}
      >
        <Icon className="w-10 h-10 text-white" />
      </div>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ title, onClear }) => {
  return (
    <div className="w-full max-w-2xl flex items-end justify-between pb-2 border-b border-[rgba(48,80,125,0.3)] mb-6">
      <div className="flex space-x-3">
        <NavItem path="/" label="Tasks" Icon={CalendarDaysIcon} />
        <NavItem path="/history" label="History" Icon={ClockIcon} />
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
