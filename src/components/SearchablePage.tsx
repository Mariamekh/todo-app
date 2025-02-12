import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './SearchBar';
import TaskList from './TaskList';
import Header from './Header';
import TaskModal from './TaskModal';

interface SearchablePageProps {
  title: string;
  fetchTasks: () => Promise<any[]>;
  onClear: () => void;
  showAddButton?: boolean;
  isHistory?: boolean;
}

const SearchablePage: React.FC<SearchablePageProps> = ({
  title,
  fetchTasks,
  onClear,
  showAddButton = false,
  isHistory = false,
}) => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: [isHistory ? 'history' : 'todos'],
    queryFn: fetchTasks,
    staleTime: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks
    ? tasks.filter((task) =>
        [task.title, task.description]
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <div className="min-h-screen bg-[rgba(232,241,253,1)] flex flex-col items-center px-4 md:px-10 py-6">
      <SearchBar onSearch={setSearchQuery} />
      <Header title={title} onClear={onClear} />
      <div className="w-full max-w-2xl">
        <TaskList
          isLoading={isLoading}
          isHistory={isHistory}
          tasks={filteredTasks}
        />
      </div>

      {showAddButton && (
        <>
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
          />
        </>
      )}
    </div>
  );
};

export default SearchablePage;
