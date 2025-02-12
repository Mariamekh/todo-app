import React from 'react';
import SearchablePage from '../components/SearchablePage';
import { useHistory } from '../hooks/useHistory';

const History = () => {
  return <SearchablePage isHistory title="Clear History" {...useHistory()} />;
};

export default History;
