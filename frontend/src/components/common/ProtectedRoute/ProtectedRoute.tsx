/**
 * Protected route component
 * Restricts access to authenticated users only
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';

/**
 * Protected route props
 */
interface ProtectedRouteProps {
    requiredRoles?: string[];
    redirectPath?: string;
}

/**
 * Protected route component
 * @param props - Protected route properties
 * @returns JSX Element
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredRoles = [],
    redirectPath = '/login',
}) => {
    const { isAuthenticated, user } = useAuthStore();

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    // Check if user has required roles
    if (requiredRoles.length > 0 && user) {
        const hasRequiredRole = requiredRoles.some((role) => user.roles.includes(role));
        if (!hasRequiredRole) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
