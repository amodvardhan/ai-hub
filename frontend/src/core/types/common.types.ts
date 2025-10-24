/**
 * Common type definitions used across the application
 */

/**
 * API Response wrapper type
 * @template T - The type of data contained in the response
 */
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    statusCode: number;
}

/**
 * Paginated response type
 * @template T - The type of items in the paginated list
 */
export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

/**
 * API Error response structure
 */
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode: number;
    timestamp: string;
}

/**
 * Notification severity levels
 */
export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

/**
 * Notification structure
 */
export interface Notification {
    id: string;
    message: string;
    severity: NotificationSeverity;
    autoHideDuration?: number;
}

/**
 * Loading state type
 */
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';
