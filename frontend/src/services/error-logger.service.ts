/**
 * Error logging service
 * Centralized error logging and reporting
 */

interface ErrorLog {
    message: string;
    stack?: string;
    componentName?: string;
    timestamp: string;
    userAgent: string;
    url: string;
}

class ErrorLoggerService {
    private logs: ErrorLog[] = [];

    /**
     * Log error to console and store
     */
    logError(
        error: Error,
        componentName?: string,
        additionalInfo?: Record<string, any>
    ): void {
        const errorLog: ErrorLog = {
            message: error.message,
            stack: error.stack,
            componentName,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
        };

        this.logs.push(errorLog);

        // Log to console in development
        if (import.meta.env.DEV) {
            console.error('Error logged:', errorLog, additionalInfo);
        }

        // TODO: Send to error tracking service in production
        // Example: this.sendToMonitoring(errorLog);
    }

    /**
     * Get all logged errors
     */
    getLogs(): ErrorLog[] {
        return this.logs;
    }

    /**
     * Clear all logs
     */
    clearLogs(): void {
        this.logs = [];
    }

    /**
     * Send errors to monitoring service
     * TODO: Implement when error tracking service is ready
     */
    private sendToMonitoring(errorLog: ErrorLog): void {
        // Example: Send to Sentry, LogRocket, etc.
        // Sentry.captureException(new Error(errorLog.message));
    }
}

export const errorLogger = new ErrorLoggerService();
