/**
 * Base service class providing common API operations
 * All feature-specific services should extend this class
 */
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@core/config/axios.config';
import { ApiResponse, PaginatedResponse, QueryParams } from '@core/types';

/**
 * Generic base service for API operations
 * @template T - The entity type this service handles
 */
export class BaseService<T> {
    protected endpoint: string;

    /**
     * Creates a new base service instance
     * @param endpoint - The API endpoint path for this service
     */
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Fetches all items with optional pagination and filtering
     * @param params - Query parameters for pagination and filtering
     * @returns Promise with paginated response
     */
    async getAll(params?: QueryParams): Promise<PaginatedResponse<T>> {
        const response: AxiosResponse<ApiResponse<PaginatedResponse<T>>> =
            await axiosInstance.get(this.endpoint, { params });
        return response.data.data;
    }

    /**
     * Fetches a single item by ID
     * @param id - The unique identifier
     * @returns Promise with the item
     */
    async getById(id: string | number): Promise<T> {
        const response: AxiosResponse<ApiResponse<T>> =
            await axiosInstance.get(`${this.endpoint}/${id}`);
        return response.data.data;
    }

    /**
     * Creates a new item
     * @param data - The item data to create
     * @returns Promise with the created item
     */
    async create(data: Partial<T>): Promise<T> {
        const response: AxiosResponse<ApiResponse<T>> =
            await axiosInstance.post(this.endpoint, data);
        return response.data.data;
    }

    /**
     * Updates an existing item
     * @param id - The unique identifier
     * @param data - The updated item data
     * @returns Promise with the updated item
     */
    async update(id: string | number, data: Partial<T>): Promise<T> {
        const response: AxiosResponse<ApiResponse<T>> =
            await axiosInstance.put(`${this.endpoint}/${id}`, data);
        return response.data.data;
    }

    /**
     * Deletes an item by ID
     * @param id - The unique identifier
     * @returns Promise with void
     */
    async delete(id: string | number): Promise<void> {
        await axiosInstance.delete(`${this.endpoint}/${id}`);
    }
}
