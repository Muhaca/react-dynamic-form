import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FieldRegistryProvider } from 'react-dynamic-form';
import { tailwindFieldRegistry } from 'react-dynamic-form/tailwind';
import { App } from './App';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FieldRegistryProvider registry={tailwindFieldRegistry}>
        <App />
      </FieldRegistryProvider>
    </QueryClientProvider>
  </StrictMode>
);
