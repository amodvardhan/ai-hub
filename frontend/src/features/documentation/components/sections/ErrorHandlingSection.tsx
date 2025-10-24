/**
 * Error Handling Section - Updated with Route-Level Strategy
 */
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';
import { useTheme } from '@mui/material/styles';

export const ErrorHandlingSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Error Handling
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        Our architecture implements elegant, multi-layered error handling with automatic route-level
        isolation, ensuring one component's failure doesn't break the entire application.
      </Alert>

      <Card title="Error Handling Architecture" sx={{ mb: 3 }}>
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
            {`┌─────────────────────────────────────────┐
│     Application Error Handling          │
├─────────────────────────────────────────┤
│                                         │
│  Level 1: Top-Level Error Boundary     │
│  └─ Catches critical routing errors    │
│                                         │
│  Level 2: Route Error Boundary         │
│  └─ Isolates errors per route/page     │
│     ├─ Elegant error UI                │
│     ├─ Navigation remains functional   │
│     └─ Auto-resets on route change     │
│                                         │
│  Level 3: Component Error Boundary     │
│  └─ Optional for specific components   │
│     └─ Granular error isolation        │
│                                         │
│  Level 4: API Error Interceptor        │
│  └─ Handles network/API errors         │
│     └─ Shows user-friendly messages    │
│                                         │
│  Level 5: Form Validation              │
│  └─ Formik + Yup validation            │
│     └─ Inline error messages           │
└─────────────────────────────────────────┘`}
          </pre>
        </Box>
      </Card>

      <Card title="Route-Level Error Boundary (Primary Strategy)" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          Every route is automatically wrapped with an error boundary. If an error occurs in any
          component on that page, only that page shows an error - navigation and other routes remain
          functional.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// Automatic route-level error handling
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Each route automatically wrapped */}
      <Route 
        path="/dashboard" 
        element={wrapRoute(<Dashboard />)} 
      />
      <Route 
        path="/profile" 
        element={wrapRoute(<Profile />)} 
      />
    </Routes>
  );
};

// wrapRoute helper function
export const wrapRoute = (element: ReactElement): ReactElement => {
  return <RouteErrorBoundary>{element}</RouteErrorBoundary>;
};

// Benefits:
// ✅ Automatic error isolation per route
// ✅ Navigation remains functional
// ✅ Elegant error UI with retry/navigation options
// ✅ Auto-resets when user navigates away
// ✅ No manual error boundary wrapping needed`}
        />
      </Card>

      <Card title="Elegant Error UI" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          When an error occurs, users see a beautiful, actionable error screen instead of a broken
          page.
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" component="pre" sx={{ m: 0 }}>
            {`┌─────────────────────────────────────────┐
│           ⚠️ Error Icon                  │
│                                         │
│   Oops! Something went wrong           │
│                                         │
│   We encountered an error while        │
│   loading the Dashboard page           │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 📛 Error Details                  │ │
│  │ Cannot read property 'x' of null  │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [Try Again] [Go Back] [Home]          │
│                                         │
│  ──────────────────────────────────    │
│                                         │
│  What you can do:                      │
│  • Try refreshing the page             │
│  • Go back to the previous page        │
│  • Return to the home page             │
│                                         │
│  [Show Developer Details ▼]            │
│                                         │
└─────────────────────────────────────────┘`}
          </Typography>
        </Box>
        <CodeBlock
          language="tsx"
          code={`// Error display features:
// ✓ Beautiful, professional UI
// ✓ Multiple action buttons (Retry, Back, Home)
// ✓ Helpful suggestions for users
// ✓ Developer details (dev mode only)
// ✓ Theme-aware (dark/light mode)
// ✓ Responsive design`}
        />
      </Card>

      <Card title="Component-Level Error Boundary (Optional)" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          For specific components that need isolated error handling, use ComponentErrorBoundary.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`import { ComponentErrorBoundary } from '@components/common';

const Dashboard: React.FC = () => {
  return (
    <Container>
      {/* Critical section - always visible */}
      <Typography variant="h4">Dashboard</Typography>

      {/* Optional: Isolate specific sections */}
      <ComponentErrorBoundary componentName="Stats Widget">
        <StatsWidget />
      </ComponentErrorBoundary>

      <ComponentErrorBoundary componentName="Recent Activity">
        <RecentActivity />
      </ComponentErrorBoundary>

      {/* If StatsWidget fails, only that section shows error */}
      {/* Rest of dashboard remains functional */}
    </Container>
  );
};`}
        />
      </Card>

      <Card title="API Error Handling" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          Axios interceptors catch all API errors and show user-friendly notifications.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// Axios response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    // Handle different error types
    if (response?.status === 401) {
      // Unauthorized - redirect to login
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    } else if (response?.status === 403) {
      // Forbidden
      showError('You do not have permission for this action');
    } else if (response?.status === 404) {
      // Not found
      showError('Resource not found');
    } else if (response?.status >= 500) {
      // Server error
      showError('Server error. Please try again later.');
    } else {
      // Generic error
      showError(response?.data?.message || 'An error occurred');
    }

    return Promise.reject(error);
  }
);`}
        />
      </Card>

      <Card title="Form Validation Error Handling" sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          Form errors are handled gracefully with inline validation messages.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

<Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ errors, touched, values, handleChange }) => (
    <Form>
      <TextField
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        error={touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />
      {/* Inline error message shown automatically */}
    </Form>
  )}
</Formik>`}
        />
      </Card>

      <Card title="Notification System">
        <Typography variant="body2" paragraph>
          User-friendly notifications for success, error, warning, and info messages.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`import { useNotification } from '@hooks/useNotification';

const MyComponent: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  const handleAction = async () => {
    try {
      await someApiCall();
      showSuccess('Action completed successfully!');
    } catch (error) {
      showError('Failed to complete action');
    }
  };

  return <Button onClick={handleAction}>Perform Action</Button>;
};

// Features:
// ✓ Auto-dismiss after 3-5 seconds
// ✓ Multiple notifications stack
// ✓ Close button for manual dismiss
// ✓ Theme-aware colors
// ✓ Position configurable (top-right, bottom-center, etc.)`}
        />
      </Card>

      <Card title="Best Practices">
        <List>
          <ListItem>
            <ListItemText
              primary="1. Use Route-Level Error Boundaries (Automatic)"
              secondary="Every route is automatically protected - no manual wrapping needed"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="2. Use Component Boundaries for Specific Sections"
              secondary="Only when you need granular isolation of specific components"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="3. Handle API Errors Gracefully"
              secondary="Always provide user-friendly error messages, not technical details"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="4. Validate Forms with Yup"
              secondary="Provide clear, helpful validation messages"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="5. Log Errors in Development"
              secondary="Use console.error for debugging, send to monitoring in production"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="6. Test Error Scenarios"
              secondary="Intentionally throw errors to verify error handling works"
            />
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};
