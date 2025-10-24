/**
 * Axios instance configuration
 * Centralized HTTP client
 */
import { axiosInstance } from '@core/config/axios.config';
import { initializeInterceptors } from './interceptors';
import { initializeRetryInterceptor } from './retry-interceptor';

// Initialize interceptors
initializeInterceptors();

// Optional: Initialize retry interceptor for resilience
if (import.meta.env.VITE_ENABLE_RETRY === 'true') {
    initializeRetryInterceptor();
}

export { axiosInstance };
export default axiosInstance;
