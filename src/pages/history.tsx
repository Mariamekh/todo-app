import React from 'react';
import SearchablePage from '../components/SearchablePage';
import { useHistory } from '../hooks/useHistory';

export default function History() {
  return <SearchablePage isHistory title="Clear History" {...useHistory()} />;
}
