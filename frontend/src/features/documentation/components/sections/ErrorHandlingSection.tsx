/**
 * Error Handling Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
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

            <Alert severity="info" sx={{ mb: 3 }}>
                Multiple layers of error handling ensure graceful degradation and user-friendly error messages.
            </Alert>

            <Card title="Error Handling Strategy" sx={{ mb: 3 }}>
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
                        {`Error Occurs
    ↓
Error Boundary (React errors)
    ├─ Logs error
    ├─ Shows fallback UI
    └─ Optional: Send to monitoring
        
OR

API Error (Axios)
    ├─ Interceptor catches error
    ├─ Shows notification
    └─ Logs to console
        
OR

Form Validation Error (Yup)
    ├─ Formik handles error
    └─ Shows inline error message`}
                    </pre>
                </Box>
            </Card>

            <Card title="Error Boundary" sx={{ mb: 3 }}>
                <CodeBlock
                    language="tsx"
                    code={`export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // Optional: Send to error monitoring service
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container>
          <Typography variant="h4">Oops! Something went wrong</Typography>
          <Button onClick={this.handleReset}>Try Again</Button>
        </Container>
      );
    }
    return this.props.children;
  }
}`}
                />
            </Card>

            <Card title="Notification System">
                <CodeBlock
                    language="tsx"
                    code={`export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return {
    showSuccess: (message: string) => 
      enqueueSnackbar(message, { variant: 'success' }),
    showError: (message: string) => 
      enqueueSnackbar(message, { variant: 'error' }),
    showWarning: (message: string) => 
      enqueueSnackbar(message, { variant: 'warning' }),
    showInfo: (message: string) => 
      enqueueSnackbar(message, { variant: 'info' }),
  };
};`}
                />
            </Card>
        </Box>
    );
};
