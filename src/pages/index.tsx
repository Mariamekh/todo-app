import React from 'react';
import SearchablePage from '../components/SearchablePage';
import { useTasks } from '../hooks/useTasks';

const Home = () => {
  return (
    <SearchablePage showAddButton title="Clear all tasks" {...useTasks()} />
  );
};

export default Home;
