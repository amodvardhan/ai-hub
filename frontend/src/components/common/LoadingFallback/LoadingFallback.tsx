/**
 * Loading fallback component for Suspense boundaries
 * Displays loading indicator while components are being loaded
 */
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loading fallback props
 */
interface LoadingFallbackProps {
    message?: string;
    fullScreen?: boolean;
}

/**
 * Loading fallback component
 * @param props - Loading fallback properties
 * @returns JSX Element
 */
export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
    message = 'Loading...',
    fullScreen = false,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: fullScreen ? '100vh' : '50vh',
                gap: 2,
            }}
        >
            <CircularProgress size={60} />
            <Typography variant="body1" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingFallback;
