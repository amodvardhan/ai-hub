/**
 * Component-level Error Boundary
 * Wraps individual components for isolated error handling
 */
import React, { ReactNode } from 'react';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface ComponentErrorBoundaryProps {
    children: ReactNode;
    componentName: string;
}

/**
 * Wrapper for isolating component errors
 * @param props - Component props
 * @returns JSX Element
 */
export const ComponentErrorBoundary: React.FC<ComponentErrorBoundaryProps> = ({
    children,
    componentName,
}) => {
    return (
        <ErrorBoundary
            isolate={true}
            componentName={componentName}
            showDetails={import.meta.env.DEV}
            onError={(error, errorInfo) => {
                // Log to console in development
                if (import.meta.env.DEV) {
                    console.error(`Component Error in ${componentName}:`, error);
                }

                // TODO: Send to error tracking service in production
                // Example: logErrorToService(componentName, error, errorInfo);
            }}
        >
            {children}
        </ErrorBoundary>
    );
};

export default ComponentErrorBoundary;
