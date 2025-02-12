import React from 'react';
import { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from '@tanstack/react-query';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/context/UserContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <UserProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Component {...pageProps} />
        </UserProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default MyApp;
