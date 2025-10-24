/**
 * Axios interceptors configuration
 * Handles request/response transformations and elegant error handling
 */
import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from '@core/config/axios.config';
import { useAuthStore } from '@store/auth.store';
import { enqueueSnackbar } from 'notistack';

/**
 * Get error message from API response
 */
const getErrorMessage = (error: AxiosError): string => {
    if (error.response?.data) {
        const data = error.response.data as any;
        return data.message || data.error || 'An error occurred';
    }
    return error.message || 'Network error occurred';
};

/**
 * Request interceptor to add authentication token
 */
export const requestInterceptor = (
    config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
    // Add authentication token
    const { accessToken } = useAuthStore.getState();
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add custom headers
    if (config.headers) {
        config.headers['X-Request-Time'] = new Date().toISOString();
        config.headers['X-Client-Version'] = import.meta.env.VITE_APP_VERSION || '1.0.0';
    }

    // Log request in development
    if (import.meta.env.DEV) {
        console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
        });
    }

    return config;
};

/**
 * Request error interceptor
 */
export const requestErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
    console.error('❌ Request Error:', error);
    enqueueSnackbar('Failed to send request', { variant: 'error' });
    return Promise.reject(error);
};

/**
 * Response interceptor to transform responses
 */
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    // Log response in development
    if (import.meta.env.DEV) {
        console.log(`📥 ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
        });
    }

    return response;
};

/**
 * Error interceptor to handle errors elegantly
 */
export const errorInterceptor = async (error: AxiosError): Promise<never> => {
    const { response, request, config } = error;

    // Network error (no response from server)
    if (!response) {
        if (!request) {
            // Request setup failed
            console.error('❌ Request Setup Error:', error.message);
            enqueueSnackbar('Failed to setup request', { variant: 'error' });
        } else {
            // Network error - no response received
            console.error('❌ Network Error:', error.message);
            enqueueSnackbar('Network error. Please check your connection.', {
                variant: 'error',
                autoHideDuration: 5000,
            });
        }
        return Promise.reject(error);
    }

    // Response received with error status
    const status = response.status;
    const errorMessage = getErrorMessage(error);
    const url = config?.url || 'unknown';

    // Log error in development
    if (import.meta.env.DEV) {
        console.error(`❌ ${status} Error on ${url}:`, {
            status,
            message: errorMessage,
            data: response.data,
        });
    }

    // Handle specific status codes
    switch (status) {
        case 400:
            // Bad Request
            enqueueSnackbar(errorMessage || 'Invalid request', {
                variant: 'error',
            });
            break;

        case 401:
            // Unauthorized - clear auth and redirect to login
            console.warn('🔒 Unauthorized access - clearing auth');
            useAuthStore.getState().clearAuth();

            // Only show message if not already on login page
            if (!window.location.pathname.includes('/login')) {
                enqueueSnackbar('Session expired. Please login again.', {
                    variant: 'warning',
                    autoHideDuration: 4000,
                });

                // Redirect to login
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
            break;

        case 403:
            // Forbidden - user doesn't have permission
            enqueueSnackbar('You do not have permission to perform this action', {
                variant: 'error',
                autoHideDuration: 5000,
            });
            break;

        case 404:
            // Not Found
            enqueueSnackbar(errorMessage || 'Resource not found', {
                variant: 'error',
            });
            break;

        case 409:
            // Conflict
            enqueueSnackbar(errorMessage || 'Conflict occurred', {
                variant: 'warning',
            });
            break;

        case 422:
            // Validation Error
            enqueueSnackbar(errorMessage || 'Validation failed', {
                variant: 'error',
            });
            break;

        case 429:
            // Too Many Requests
            enqueueSnackbar('Too many requests. Please try again later.', {
                variant: 'warning',
                autoHideDuration: 6000,
            });
            break;

        case 500:
            // Internal Server Error
            enqueueSnackbar('Server error. Please try again later.', {
                variant: 'error',
                autoHideDuration: 5000,
            });
            break;

        case 502:
            // Bad Gateway
            enqueueSnackbar('Service temporarily unavailable', {
                variant: 'error',
                autoHideDuration: 5000,
            });
            break;

        case 503:
            // Service Unavailable
            enqueueSnackbar('Service is under maintenance. Please try again later.', {
                variant: 'warning',
                autoHideDuration: 6000,
            });
            break;

        case 504:
            // Gateway Timeout
            enqueueSnackbar('Request timeout. Please try again.', {
                variant: 'error',
                autoHideDuration: 5000,
            });
            break;

        default:
            // Generic error for other status codes
            if (status >= 500) {
                enqueueSnackbar('Server error occurred. Please try again later.', {
                    variant: 'error',
                });
            } else if (status >= 400) {
                enqueueSnackbar(errorMessage || 'Request failed', {
                    variant: 'error',
                });
            }
    }

    // TODO: Send error to monitoring service in production
    // Example: Sentry.captureException(error);

    return Promise.reject(error);
};

/**
 * Initialize all interceptors
 */
export const initializeInterceptors = (): void => {
    // Request interceptors
    axiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

    // Response interceptors
    axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

    console.log('✅ Axios interceptors initialized');
};
