/**
 * React Query configuration
 * Defines default options for queries and mutations
 */
import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from '@core/types';

/**
 * Default options for React Query
 */
const queryConfig: DefaultOptions = {
    queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
            const axiosError = error as AxiosError<ApiError>;
            // Don't retry on 4xx errors
            if (axiosError.response?.status && axiosError.response.status < 500) {
                return false;
            }
            return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
        retry: false,
    },
};

/**
 * Creates and configures the React Query client
 * @returns Configured QueryClient instance
 */
export const createQueryClient = (): QueryClient => {
    return new QueryClient({
        defaultOptions: queryConfig,
    });
};

export const queryClient = createQueryClient();
