/**
 * Data Flow & State Management Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';
import { useTheme } from '@mui/material/styles';

export const DataFlowSection: React.FC = () => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Data Flow & State Management
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                The application uses multiple state management solutions, each optimized for specific use cases.
            </Alert>

            <Card title="State Management Architecture" sx={{ mb: 3 }}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        overflow: 'auto',
                    }}
                >
                    <pre style={{ margin: 0 }}>
                        {`┌──────────────────────────────────────────────┐
│           STATE MANAGEMENT                    │
│                                               │
│  ┌─────────────────┐  ┌─────────────────┐   │
│  │  Server State   │  │  Client State   │   │
│  │  (React Query)  │  │   (Zustand)     │   │
│  └─────────────────┘  └─────────────────┘   │
│         │                     │              │
│         ↓                     ↓              │
│  ┌─────────────────┐  ┌─────────────────┐   │
│  │ - User Data     │  │ - Auth State    │   │
│  │ - Dashboard     │  │ - User Info     │   │
│  │ - Profile       │  │ - Tokens        │   │
│  └─────────────────┘  └─────────────────┘   │
│                                               │
│  ┌──────────────────────────────────────┐    │
│  │       Context API (UI State)         │    │
│  │  - Theme Mode (Light/Dark)           │    │
│  └──────────────────────────────────────┘    │
│                                               │
│  ┌──────────────────────────────────────┐    │
│  │       Local Storage                  │    │
│  │  - Theme Preference                  │    │
│  │  - Language                          │    │
│  │  - Settings                          │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘`}
                    </pre>
                </Box>
            </Card>

            <Card title="React Query (Server State)" sx={{ mb: 3 }}>
                <Typography variant="body2" paragraph>
                    Manages server-side data with automatic caching, synchronization, and background updates.
                </Typography>
                <CodeBlock
                    language="tsx"
                    code={`// In custom hook
export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      setAuth(response.user, response.accessToken);
      showSuccess('Login successful');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
  };
};`}
                />
            </Card>

            <Card title="Zustand (Client State)" sx={{ mb: 3 }}>
                <Typography variant="body2" paragraph>
                    Lightweight state management for authentication and global client state.
                </Typography>
                <CodeBlock
                    language="tsx"
                    code={`// Store definition
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) => {
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },
      clearAuth: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);

// Usage in components
const { user, isAuthenticated, setAuth } = useAuthStore();`}
                />
            </Card>

            <Card title="Data Flow Diagram">
                <Box
                    sx={{
                        p: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        overflow: 'auto',
                    }}
                >
                    <pre style={{ margin: 0 }}>
                        {`User Action
    ↓
Component Event Handler
    ↓
Custom Hook (Business Logic)
    ↓
Service Layer (API Call)
    ↓
Axios Instance → Interceptors → Backend API
    ↓
Response
    ↓
React Query Cache Update
    ↓
Component Re-render
    ↓
UI Update`}
                    </pre>
                </Box>
            </Card>
        </Box>
    );
};
