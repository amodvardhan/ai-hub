/**
 * Axios instance configuration with interceptors
 * Handles authentication, error handling, and request/response transformation
 */
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '@core/types';

/**
 * Creates and configures the axios instance
 * @returns Configured axios instance
 */
export const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor - Add auth token
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('accessToken');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor - Handle errors globally
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError<ApiError>) => {
            const originalRequest = error.config;

            // Handle 401 Unauthorized - Token refresh logic
            if (error.response?.status === 401 && originalRequest) {
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        const response = await axios.post(
                            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                            { refreshToken }
                        );

                        const { accessToken } = response.data;
                        localStorage.setItem('accessToken', accessToken);

                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        }

                        return instance(originalRequest);
                    }
                } catch (refreshError) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export const axiosInstance = createAxiosInstance();
