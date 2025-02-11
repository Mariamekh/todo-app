import React, { useState, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      setTimeout(() => onSearch(value), 300);
    },
    [onSearch],
  );

  return (
    <div className="relative w-full max-w-2xl mb-6">
      <input
        type="text"
        placeholder="Search for notes"
        value={query}
        onChange={handleSearch}
        className="w-full py-3 pl-4 pr-12 rounded-lg bg-white shadow-[0px_2px_8px_0px_rgba(106,108,224,0.26)] text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[rgba(106,108,224,0.8)] transition"
        aria-label="Search notes"
      />

      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[rgba(106,108,224,1)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(106,108,224,0.8)] transition"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
