/**
 * Application routing configuration
 * Defines all routes with automatic error boundaries
 */
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@components/common';
import { LoadingFallback } from '@components/common/LoadingFallback/LoadingFallback';
import { ProtectedRoute } from '@components/common/ProtectedRoute/ProtectedRoute';
import MainLayout from '@components/layout/MainLayout/MainLayout';
import AuthLayout from '@components/layout/AuthLayout/AuthLayout';
import { ROUTES } from '@core/constants/routes.constants';
import { wrapRoute } from './RouteWrapper';

// Lazy load pages
const Login = lazy(() => import('@features/auth/pages/Login'));
const Register = lazy(() => import('@features/auth/pages/Register'));
const Dashboard = lazy(() => import('@features/dashboard/pages/Dashboard'));
const Profile = lazy(() => import('@features/profile/pages/Profile'));
const Settings = lazy(() => import('@features/settings/pages/Settings'));
const ComponentsShowcase = lazy(() => import('@features/showcase/pages/ComponentsShowcase'));
const ArchitectureDocs = lazy(() => import('@features/documentation/pages/ArchitectureDocs'));
const Unauthorized = lazy(() => import('@features/error/pages/Unauthorized'));
const NotFound = lazy(() => import('@features/error/pages/NotFound'));

/**
 * Application routes component
 */
export const AppRoutes: React.FC = () => {
    return (
        <ErrorBoundary componentName="Application Routes" showDetails={import.meta.env.DEV}>
            <Suspense fallback={<LoadingFallback fullScreen />}>
                <Routes>
                    {/* Public routes */}
                    <Route element={<AuthLayout />}>
                        <Route path={ROUTES.LOGIN} element={wrapRoute(<Login />)} />
                        <Route path={ROUTES.REGISTER} element={wrapRoute(<Register />)} />
                        <Route path={ROUTES.UNAUTHORIZED} element={wrapRoute(<Unauthorized />)} />
                    </Route>

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                            <Route path={ROUTES.DASHBOARD} element={wrapRoute(<Dashboard />)} />
                            <Route path={ROUTES.PROFILE} element={wrapRoute(<Profile />)} />
                            <Route path={ROUTES.SETTINGS} element={wrapRoute(<Settings />)} />
                            <Route path={ROUTES.SHOWCASE} element={wrapRoute(<ComponentsShowcase />)} />
                            <Route path={ROUTES.DOCS} element={wrapRoute(<ArchitectureDocs />)} />
                        </Route>
                    </Route>

                    {/* 404 route */}
                    <Route path={ROUTES.NOT_FOUND} element={wrapRoute(<NotFound />)} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};

export default AppRoutes;
