/**
 * Routing Architecture Section - Updated to match actual implementation
 */
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
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

      <Alert severity="success" sx={{ mb: 3 }}>
        The application uses React Router v6 with automatic error boundaries, protected routes,
        nested layouts, and lazy loading for optimal performance.
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
            {`Application Routes (with automatic error boundaries)
│
├─ Public Routes (AuthLayout)
│  ├─ /login          → Login Page [wrapped]
│  ├─ /register       → Register Page [wrapped]
│  └─ /unauthorized   → Unauthorized Page [wrapped]
│
├─ Protected Routes (ProtectedRoute + MainLayout)
│  ├─ /              → Redirect to /dashboard
│  ├─ /dashboard     → Dashboard [wrapped]
│  ├─ /profile       → Profile [wrapped]
│  ├─ /settings      → Settings [wrapped]
│  ├─ /showcase      → Component Showcase [wrapped]
│  └─ /docs          → Architecture Docs [wrapped]
│
└─ Error Routes
   └─ /*             → 404 Not Found [wrapped]

[wrapped] = RouteErrorBoundary automatically wraps each route`}
          </pre>
        </Box>
      </Card>

      <Card title="Complete Route Configuration (AppRoutes.tsx)" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          This is the actual implementation from our application. All routes are automatically
          wrapped with error boundaries using the <code>wrapRoute</code> helper.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`/**
 * Application routing configuration
 * Defines all routes with automatic error boundaries
 */
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@components/common';
import { LoadingFallback } from '@components/common/LoadingFallback/LoadingFallback';
import { ProtectedRoute } from '@components/common/ProtectedRoute/ProtectedRoute';
import MainLayout from '@components/layout/MainLayout/MainLayout';
import AuthLayout from '@components/layout/AuthLayout/AuthLayout';
import { ROUTES } from '@core/constants/routes.constants';
import { wrapRoute } from './RouteWrapper';

// Lazy load pages
const Login = lazy(() => import('@features/auth/pages/Login'));
const Register = lazy(() => import('@features/auth/pages/Register'));
const Dashboard = lazy(() => import('@features/dashboard/pages/Dashboard'));
const Profile = lazy(() => import('@features/profile/pages/Profile'));
const Settings = lazy(() => import('@features/settings/pages/Settings'));
const ComponentsShowcase = lazy(() => import('@features/showcase/pages/ComponentsShowcase'));
const ArchitectureDocs = lazy(() => import('@features/documentation/pages/ArchitectureDocs'));
const Unauthorized = lazy(() => import('@features/error/pages/Unauthorized'));
const NotFound = lazy(() => import('@features/error/pages/NotFound'));

/**
 * Application routes component
 */
export const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary componentName="Application Routes" showDetails={import.meta.env.DEV}>
      <Suspense fallback={<LoadingFallback fullScreen />}>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={wrapRoute(<Login />)} />
            <Route path={ROUTES.REGISTER} element={wrapRoute(<Register />)} />
            <Route path={ROUTES.UNAUTHORIZED} element={wrapRoute(<Unauthorized />)} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
              <Route path={ROUTES.DASHBOARD} element={wrapRoute(<Dashboard />)} />
              <Route path={ROUTES.PROFILE} element={wrapRoute(<Profile />)} />
              <Route path={ROUTES.SETTINGS} element={wrapRoute(<Settings />)} />
              <Route path={ROUTES.SHOWCASE} element={wrapRoute(<ComponentsShowcase />)} />
              <Route path={ROUTES.DOCS} element={wrapRoute(<ArchitectureDocs />)} />
            </Route>
          </Route>

          {/* 404 route */}
          <Route path={ROUTES.NOT_FOUND} element={wrapRoute(<NotFound />)} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;`}
        />
      </Card>

      <Card title="Route Constants" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          Centralized route paths for type safety and consistency.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/core/constants/routes.constants.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SHOWCASE: '/showcase',
  DOCS: '/docs',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
} as const;

// Usage: Always use ROUTES constants instead of hardcoded strings
<Route path={ROUTES.DASHBOARD} element={wrapRoute(<Dashboard />)} />
// ✅ Good: Type-safe, refactorable

<Route path="/dashboard" element={wrapRoute(<Dashboard />)} />
// ❌ Bad: Hardcoded string, prone to typos`}
        />
      </Card>

      <Card title="wrapRoute Helper Function" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          Simple helper that wraps each route with a RouteErrorBoundary for automatic error
          isolation.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/routes/RouteWrapper.tsx
import React, { ReactElement } from 'react';
import { RouteErrorBoundary } from '@components/common';

/**
 * Wraps a route element with error boundary
 */
export const wrapRoute = (element: ReactElement): ReactElement => {
  return <RouteErrorBoundary>{element}</RouteErrorBoundary>;
};

// Usage in AppRoutes:
<Route path="/dashboard" element={wrapRoute(<Dashboard />)} />

// Benefits:
// ✓ Automatic error isolation per route
// ✓ Elegant error UI with retry/navigation
// ✓ Auto-resets on route change
// ✓ No manual error boundary wrapping
// ✓ Keeps navigation functional even if page fails`}
        />
      </Card>

      <Card title="Protected Route Implementation" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          ProtectedRoute component checks authentication before allowing access to routes.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/components/common/ProtectedRoute/ProtectedRoute.tsx
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
  redirectPath = '/login',
}) => {
  const { isAuthenticated, user } = useAuthStore();

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check roles (if specified)
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.some((role) => 
      user.roles.includes(role)
    );
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

// Usage in AppRoutes - wraps all protected routes:
<Route element={<ProtectedRoute />}>
  <Route element={<MainLayout />}>
    <Route path={ROUTES.DASHBOARD} element={wrapRoute(<Dashboard />)} />
    {/* All child routes are automatically protected */}
  </Route>
</Route>

// With role-based access:
<Route element={<ProtectedRoute requiredRoles={['admin']} />}>
  <Route path="/admin" element={wrapRoute(<AdminPanel />)} />
</Route>`}
        />
      </Card>

      <Card title="Lazy Loading Strategy" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          All pages are lazy-loaded with React.lazy() for optimal bundle size and performance.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// Lazy load pages at the top of AppRoutes.tsx
const Dashboard = lazy(() => import('@features/dashboard/pages/Dashboard'));
const Profile = lazy(() => import('@features/profile/pages/Profile'));
const Settings = lazy(() => import('@features/settings/pages/Settings'));

// Wrap entire Routes with Suspense
<Suspense fallback={<LoadingFallback fullScreen />}>
  <Routes>
    {/* Routes here */}
  </Routes>
</Suspense>

// Benefits:
// ✓ Smaller initial bundle (faster first load)
// ✓ Code splitting per route
// ✓ Load components only when needed
// ✓ Better performance metrics
// ✓ Improved user experience`}
        />
      </Card>

      <Card title="Error Handling Flow" sx={{ mb: 3 }}>
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
            {`User navigates to /dashboard
         ↓
React Router matches route
         ↓
Suspense shows LoadingFallback
         ↓
Dashboard lazy loads
         ↓
wrapRoute wraps with RouteErrorBoundary
         ↓
❌ Error occurs in Dashboard
         ↓
RouteErrorBoundary catches error
         ↓
Shows elegant error UI:
  • Error message
  • Try Again button
  • Go Back button
  • Go Home button
         ↓
Navigation remains functional
Other routes still work normally
         ↓
User clicks "Try Again"
         ↓
Component reloads
OR
User navigates away → Error boundary resets`}
          </pre>
        </Box>
      </Card>

      <Card title="Adding New Routes - Step by Step">
        <Typography variant="body2" paragraph>
          Follow these steps to add a new route to the application:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. Add route constant"
              secondary="Add to src/core/constants/routes.constants.ts"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="2. Create page component"
              secondary="Create in src/features/[feature-name]/pages/"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="3. Lazy load in AppRoutes"
              secondary="const NewPage = lazy(() => import('@features/...'));"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="4. Add route with wrapRoute"
              secondary="<Route path={ROUTES.NEW} element={wrapRoute(<NewPage />)} />"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="5. Update navigation (optional)"
              secondary="Add to MainLayout navigation menu if needed"
            />
          </ListItem>
        </List>
        <CodeBlock
          language="tsx"
          code={`// Example: Adding a Reports page

// Step 1: Add to routes.constants.ts
export const ROUTES = {
  // ... existing routes
  REPORTS: '/reports',
};

// Step 2: Create page component
// src/features/reports/pages/Reports.tsx
export const Reports: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Reports</Typography>
      {/* Your reports content */}
    </Container>
  );
};

// Step 3 & 4: Add to AppRoutes.tsx
const Reports = lazy(() => import('@features/reports/pages/Reports'));

// Inside Routes:
<Route path={ROUTES.REPORTS} element={wrapRoute(<Reports />)} />

// That's it! Error boundary is automatic via wrapRoute!`}
        />
      </Card>
    </Box>
  );
};
