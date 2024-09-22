// main.tsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'; 
import Landing from './pages/landing/Landing';
import Login from './pages/Login';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';

// Create query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

// Define routes
const routes = [
  {
    path: '/',
    element: <App />, // Parent route, contains child routes
    children: [
      { path: '/', element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/resources', element: <ResourceList /> }, // This route uses React Query
      { path: '/resource/:id', element: <ResourceDetail /> }, // This route also uses React Query
    ],
  },
];

// Create router instance
const router = createBrowserRouter(routes);

// Render the app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
