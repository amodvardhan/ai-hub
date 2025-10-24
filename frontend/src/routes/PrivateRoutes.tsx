/**
 * Private routes configuration
 * Alternative implementation for protected routes
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';

/**
 * Private route props
 */
interface PrivateRouteProps {
    children: React.ReactElement;
    requiredRoles?: string[];
    redirectTo?: string;
}

/**
 * Private route wrapper component
 * Alternative implementation to ProtectedRoute
 * @param props - Private route properties
 * @returns JSX Element
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    children,
    requiredRoles = [],
    redirectTo = '/login',
}) => {
    const { isAuthenticated, user } = useAuthStore();

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Check if user has required roles
    if (requiredRoles.length > 0 && user) {
        const hasRequiredRole = requiredRoles.some((role) => user.roles.includes(role));
        if (!hasRequiredRole) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
};

export default PrivateRoute;
