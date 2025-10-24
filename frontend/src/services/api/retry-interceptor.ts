/**
 * Retry interceptor for failed requests
 * Automatically retries failed requests with exponential backoff
 */
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { axiosInstance } from '@core/config/axios.config';

interface RetryConfig {
    retries: number;
    retryDelay: number;
    retryCount?: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
    retries: 3,
    retryDelay: 1000,
    retryCount: 0,
};

/**
 * Should retry request based on error
 */
const shouldRetry = (error: AxiosError): boolean => {
    // Only retry on network errors or 5xx server errors
    if (!error.response) {
        return true; // Network error
    }

    const status = error.response.status;
    return status >= 500 && status <= 599;
};

/**
 * Retry interceptor
 */
export const retryInterceptor = async (error: AxiosError): Promise<any> => {
    const config = error.config as InternalAxiosRequestConfig & RetryConfig;

    // Set default retry config if not present
    if (!config.retryCount) {
        config.retries = DEFAULT_RETRY_CONFIG.retries;
        config.retryDelay = DEFAULT_RETRY_CONFIG.retryDelay;
        config.retryCount = 0;
    }

    // Check if should retry
    if (!shouldRetry(error) || config.retryCount >= config.retries) {
        return Promise.reject(error);
    }

    // Increment retry count
    config.retryCount += 1;

    // Calculate delay with exponential backoff
    const delay = config.retryDelay * Math.pow(2, config.retryCount - 1);

    console.log(`🔄 Retrying request (${config.retryCount}/${config.retries}) after ${delay}ms`);

    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Retry request
    return axiosInstance(config);
};

/**
 * Initialize retry interceptor
 */
export const initializeRetryInterceptor = (): void => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        retryInterceptor
    );

    console.log('✅ Retry interceptor initialized');
};
