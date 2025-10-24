/**
 * Root application component
 * Configures providers and routing
 */
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CssBaseline } from '@mui/material';
import { queryClient } from '@core/config/react-query.config';
import { ThemeContextProvider } from '@core/contexts';
import { NotificationProvider } from '@components/common/NotificationProvider/NotificationProvider';
import { initializeInterceptors } from '@services/api/interceptors';
import AppRoutes from '@routes/AppRoutes';

/**
 * Root application component
 * @returns JSX Element
 */
const App: React.FC = () => {
  /**
   * Initialize axios interceptors on app mount
   */
  useEffect(() => {
    initializeInterceptors();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <CssBaseline />
        <NotificationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </NotificationProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default App;
