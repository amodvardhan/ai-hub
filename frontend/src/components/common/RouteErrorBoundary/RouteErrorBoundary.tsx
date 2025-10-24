/**
 * Route Error Boundary with Elegant Error UI
 * Uses only wrapper components - following architecture principles
 */
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Collapse, Divider, Stack } from '@mui/material';
import {
    ErrorOutline as ErrorIcon,
    Home as HomeIcon,
    Refresh as RefreshIcon,
    ArrowBack as BackIcon,
    ExpandMore as ExpandMoreIcon,
    BugReport as BugIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Button, Alert } from '@components/wrappers';

interface RouteErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

/**
 * Elegant Error Display Component
 * Uses wrapper components only
 */
const ElegantErrorDisplay: React.FC<{
    error: Error;
    errorInfo: React.ErrorInfo | null;
    onReset: () => void;
    routeName: string;
}> = ({ error, errorInfo, onReset, routeName }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = React.useState(false);

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '70vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        p: 4,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                    }}
                >
                    {/* Icon and Title */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: theme.palette.mode === 'dark' ? 'error.dark' : 'error.light',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                mb: 2,
                            }}
                        >
                            <ErrorIcon sx={{ fontSize: 40, color: 'error.main' }} />
                        </Box>
                        <Typography variant="h4" gutterBottom fontWeight={600}>
                            Oops! Something went wrong
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            We encountered an error while loading the {routeName} page
                        </Typography>
                    </Box>

                    {/* Error Message - Using Wrapper */}
                    <Alert
                        severity="error"
                        sx={{
                            mb: 3,
                            '& .MuiAlert-message': {
                                width: '100%',
                            },
                        }}
                    >
                        <Typography variant="subtitle2" gutterBottom>
                            Error Details
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                            {error.message || 'An unexpected error occurred'}
                        </Typography>
                    </Alert>

                    {/* Action Buttons - Using Wrappers */}
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                        <Button variant="contained" startIcon={<RefreshIcon />} onClick={onReset} size="large">
                            Try Again
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<BackIcon />}
                            onClick={() => navigate(-1)}
                            size="large"
                        >
                            Go Back
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<HomeIcon />}
                            onClick={() => navigate('/')}
                            size="large"
                        >
                            Home
                        </Button>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* Helpful Tips */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom color="text.secondary">
                            What you can do:
                        </Typography>
                        <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Try refreshing the page
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Go back to the previous page
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Return to the home page
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                If the problem persists, contact support
                            </Typography>
                        </Box>
                    </Box>

                    {/* Developer Details (Collapsible) */}
                    {import.meta.env.DEV && (
                        <>
                            <Button
                                fullWidth
                                onClick={() => setShowDetails(!showDetails)}
                                endIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s',
                                        }}
                                    />
                                }
                                startIcon={<BugIcon />}
                                sx={{ mb: 2 }}
                            >
                                {showDetails ? 'Hide' : 'Show'} Developer Details
                            </Button>
                            <Collapse in={showDetails}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                                        borderRadius: 2,
                                        maxHeight: 300,
                                        overflow: 'auto',
                                    }}
                                >
                                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                        Stack Trace:
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        component="pre"
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontSize: '0.75rem',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            margin: 0,
                                        }}
                                    >
                                        {error.stack}
                                    </Typography>
                                    {errorInfo && (
                                        <>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                gutterBottom
                                                display="block"
                                            >
                                                Component Stack:
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                component="pre"
                                                sx={{
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.75rem',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                    margin: 0,
                                                }}
                                            >
                                                {errorInfo.componentStack}
                                            </Typography>
                                        </>
                                    )}
                                </Paper>
                            </Collapse>
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

/**
 * Route Error Boundary Class Component
 */
class RouteErrorBoundaryClass extends React.Component<
    RouteErrorBoundaryProps & { location: ReturnType<typeof useLocation>; routeName: string },
    ErrorState
> {
    constructor(props: RouteErrorBoundaryProps & { location: any; routeName: string }) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorState> {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(`❌ Route Error in ${this.props.routeName}:`, error, errorInfo);
        this.setState({ errorInfo });
    }

    componentDidUpdate(prevProps: RouteErrorBoundaryProps & { location: any }) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            if (this.state.hasError) {
                this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                });
            }
        }
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render(): React.ReactNode {
        const { hasError, error, errorInfo } = this.state;
        const { children, routeName } = this.props;

        if (hasError && error) {
            return (
                <ElegantErrorDisplay
                    error={error}
                    errorInfo={errorInfo}
                    onReset={this.handleReset}
                    routeName={routeName}
                />
            );
        }

        return children;
    }
}

/**
 * Route Error Boundary Wrapper (Functional Component)
 */
export const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({ children }) => {
    const location = useLocation();

    const getRouteName = (): string => {
        const pathname = location.pathname;
        const segments = pathname.split('/').filter(Boolean);

        if (segments.length === 0) return 'Home';

        const name = segments[0]
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return name;
    };

    return (
        <RouteErrorBoundaryClass location={location} routeName={getRouteName()}>
            {children}
        </RouteErrorBoundaryClass>
    );
};

export default RouteErrorBoundary;
