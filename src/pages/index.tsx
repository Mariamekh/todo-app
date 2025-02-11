import React from 'react';
import SearchablePage from '../components/SearchablePage';
import { useTasks } from '../hooks/useTasks';

export default function Home() {
  return (
    <SearchablePage showAddButton title="Clear all tasks" {...useTasks()} />
  );
}
