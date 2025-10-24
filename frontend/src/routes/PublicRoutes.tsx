/**
 * Public routes configuration
 * Routes that are accessible without authentication
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';

/**
 * Public route props
 */
interface PublicRouteProps {
    children: React.ReactElement;
    redirectTo?: string;
}

/**
 * Public route wrapper component
 * Redirects to dashboard if user is already authenticated
 * @param props - Public route properties
 * @returns JSX Element
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({
    children,
    redirectTo = '/dashboard',
}) => {
    const { isAuthenticated } = useAuthStore();

    // If user is authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default PublicRoute;
