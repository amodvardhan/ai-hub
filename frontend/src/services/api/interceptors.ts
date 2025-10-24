/**
 * Axios interceptors configuration
 * Handles request/response transformations and error handling
 */
import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from '@core/config/axios.config';

/**
 * Request interceptor to add custom headers or modify requests
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add custom request logic here
    // For example: add timestamp, request ID, etc.
    if (config.headers) {
        config.headers['X-Request-Time'] = new Date().toISOString();
    }
    return config;
};

/**
 * Response interceptor to transform responses
 */
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    // Add custom response transformation logic here
    return response;
};

/**
 * Error interceptor to handle errors globally
 */
export const errorInterceptor = (error: AxiosError): Promise<AxiosError> => {
    // Add custom error handling logic here
    if (error.response) {
        // Server responded with error status
        console.error('Response Error:', error.response.status);
    } else if (error.request) {
        // Request was made but no response received
        console.error('Request Error:', error.message);
    } else {
        // Something else happened
        console.error('Error:', error.message);
    }
    return Promise.reject(error);
};

/**
 * Initialize all interceptors
 */
export const initializeInterceptors = (): void => {
    // Request interceptors
    axiosInstance.interceptors.request.use(requestInterceptor, errorInterceptor);

    // Response interceptors
    axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
};
