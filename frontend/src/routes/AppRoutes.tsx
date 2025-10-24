/**
 * Application routing configuration
 * Defines all routes with lazy loading and protection
 */
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary';
import { LoadingFallback } from '@components/common/LoadingFallback/LoadingFallback';
import { ProtectedRoute } from '@components/common/ProtectedRoute/ProtectedRoute';
import { MainLayout, AuthLayout } from '@components/layout';
import { ROUTES } from '@core/constants/routes.constants';

// Lazy load pages
const Login = lazy(() => import('@features/auth/pages/Login'));
const Register = lazy(() => import('@features/auth/pages/Register'));
const Dashboard = lazy(() => import('@features/dashboard/pages/Dashboard'));
const Profile = lazy(() => import('@features/profile/pages/Profile'));
const Settings = lazy(() => import('@features/settings/pages/Settings'));
const Unauthorized = lazy(() => import('@features/error/pages/Unauthorized'));
const NotFound = lazy(() => import('@features/error/pages/NotFound'));

/**
 * Application routes component
 * @returns JSX Element
 */
export const AppRoutes: React.FC = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingFallback fullScreen />}>
                <Routes>
                    {/* Public routes with AuthLayout */}
                    <Route element={<AuthLayout />}>
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.REGISTER} element={<Register />} />
                        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
                    </Route>

                    {/* Protected routes with MainLayout */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                            <Route path={ROUTES.PROFILE} element={<Profile />} />
                            <Route path={ROUTES.SETTINGS} element={<Settings />} />
                        </Route>
                    </Route>

                    {/* 404 route */}
                    <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};

export default AppRoutes;
