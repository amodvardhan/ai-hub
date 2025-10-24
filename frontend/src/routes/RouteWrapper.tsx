/**
 * Route Wrapper
 * Automatically wraps routes with error boundaries and suspense
 */
import React, { ReactElement } from 'react';
import { RouteErrorBoundary } from '@components/common';

interface RouteWrapperProps {
    element: ReactElement;
}

/**
 * Wraps a route element with error boundary
 */
export const RouteWrapper: React.FC<RouteWrapperProps> = ({ element }) => {
    return <RouteErrorBoundary>{element}</RouteErrorBoundary>;
};

// Helper function to wrap route elements
export const wrapRoute = (element: ReactElement): ReactElement => {
    return <RouteErrorBoundary>{element}</RouteErrorBoundary>;
};
