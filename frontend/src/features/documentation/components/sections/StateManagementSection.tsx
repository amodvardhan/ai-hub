/**
 * State Management Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const StateManagementSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            State Management
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
            Use the right tool for the right job: React Query for server state, Zustand for client state, Context for UI state.
        </Alert>

        <Card title="When to Use What" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
                React Query (Server State)
            </Typography>
            <Typography variant="body2" paragraph>
                • Fetching data from APIs<br />
                • Caching server responses<br />
                • Background refetching<br />
                • Mutations (create, update, delete)
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
                Zustand (Client State)
            </Typography>
            <Typography variant="body2" paragraph>
                • Authentication state<br />
                • User preferences<br />
                • Global application state<br />
                • Persistent state (with localStorage)
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
                Context API (UI State)
            </Typography>
            <Typography variant="body2">
                • Theme mode (light/dark)<br />
                • UI-specific state<br />
                • Provider-based features
            </Typography>
        </Card>

        <Card title="Zustand Store Example" sx={{ mb: 3 }}>
            <CodeBlock
                language="tsx"
                code={`import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) => {
        set({ user, accessToken, isAuthenticated: true });
      },
      clearAuth: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);`}
            />
        </Card>

        <Card title="React Query Hook Example">
            <CodeBlock
                language="tsx"
                code={`export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showSuccess('Product updated successfully');
    },
  });
};`}
            />
        </Card>
    </Box>
);
