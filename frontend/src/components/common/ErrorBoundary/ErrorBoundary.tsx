/**
 * Enhanced Error Boundary Component
 * Provides granular error isolation and elegant fallback UI
 */
import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { ErrorOutline as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    isolate?: boolean; // If true, only this component fails, not the whole page
    componentName?: string; // For better error messages
    showDetails?: boolean; // Show error details in dev mode
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches errors in child components and shows fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        const { onError, componentName } = this.props;

        // Log error to console
        console.error(
            `❌ Error in ${componentName || 'Component'}:`,
            error,
            errorInfo
        );

        // Update state with error info
        this.setState({
            errorInfo,
        });

        // Call custom error handler if provided
        if (onError) {
            onError(error, errorInfo);
        }

        // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
        // Example: Sentry.captureException(error);
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render(): ReactNode {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback, isolate = false, componentName, showDetails = false } = this.props;

        if (hasError) {
            // Custom fallback UI provided
            if (fallback) {
                return fallback;
            }

            // Default fallback UI - Compact for isolated errors
            if (isolate) {
                return (
                    <Alert
                        severity="error"
                        action={
                            <Button size="small" onClick={this.handleReset} startIcon={<RefreshIcon />}>
                                Retry
                            </Button>
                        }
                        sx={{ m: 2 }}
                    >
                        <Typography variant="subtitle2">
                            {componentName ? `Error in ${componentName}` : 'Component Error'}
                        </Typography>
                        {showDetails && import.meta.env.DEV && (
                            <Typography variant="caption" component="div" sx={{ mt: 1 }}>
                                {error?.message}
                            </Typography>
                        )}
                    </Alert>
                );
            }

            // Full page error (for critical errors)
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px',
                        p: 3,
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            maxWidth: 600,
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Oops! Something went wrong
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            {componentName
                                ? `An error occurred in the ${componentName} component.`
                                : 'An unexpected error occurred.'}
                        </Typography>

                        {showDetails && import.meta.env.DEV && error && (
                            <Box sx={{ mt: 3, textAlign: 'left' }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Error Details (Development Mode):
                                </Typography>
                                <Paper
                                    sx={{
                                        p: 2,
                                        bgcolor: 'error.light',
                                        color: 'error.contrastText',
                                        maxHeight: 200,
                                        overflow: 'auto',
                                    }}
                                >
                                    <Typography variant="caption" component="pre" sx={{ margin: 0 }}>
                                        {error.message}
                                        {errorInfo && `\n\n${errorInfo.componentStack}`}
                                    </Typography>
                                </Paper>
                            </Box>
                        )}

                        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button variant="contained" onClick={this.handleReset} startIcon={<RefreshIcon />}>
                                Try Again
                            </Button>
                            <Button variant="outlined" onClick={() => window.location.href = '/'}>
                                Go to Home
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
