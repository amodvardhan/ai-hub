/**
 * Routing Architecture Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';
import { useTheme } from '@mui/material/styles';

export const RoutingSection: React.FC = () => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Routing Architecture
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                The application uses React Router v6 with protected routes and nested layouts.
            </Alert>

            <Card title="Route Structure" sx={{ mb: 3 }}>
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
                        {`Application Routes
│
├─ Public Routes (AuthLayout)
│  ├─ /login          → Login Page
│  ├─ /register       → Register Page
│  └─ /unauthorized   → Unauthorized Page
│
├─ Protected Routes (MainLayout + ProtectedRoute)
│  ├─ /              → Redirect to /dashboard
│  ├─ /dashboard     → Dashboard Page
│  ├─ /profile       → Profile Page
│  ├─ /settings      → Settings Page
│  ├─ /showcase      → Component Showcase
│  └─ /docs          → Architecture Docs
│
└─ Error Routes
   └─ /*             → 404 Not Found Page`}
                    </pre>
                </Box>
            </Card>

            <Card title="Protected Route Implementation" sx={{ mb: 3 }}>
                <CodeBlock
                    language="tsx"
                    code={`export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
  redirectPath = '/login',
}) => {
  const { isAuthenticated, user } = useAuthStore();

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check roles
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.some((role) => 
      user.roles.includes(role)
    );
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};`}
                />
            </Card>

            <Card title="Route Configuration">
                <CodeBlock
                    language="tsx"
                    code={`export const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback fullScreen />}>
        <Routes>
          {/* Public routes with AuthLayout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes with MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};`}
                />
            </Card>
        </Box>
    );
};
