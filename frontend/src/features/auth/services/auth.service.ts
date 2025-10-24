/**
 * Authentication service
 * Handles all authentication-related API calls
 */
import { BaseService } from '@services/base.service';
import { axiosInstance } from '@core/config/axios.config';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';
import { ApiResponse } from '@core/types';

/**
 * Authentication service class
 */
class AuthService extends BaseService<AuthResponse> {
    constructor() {
        super('/auth');
    }

    /**
     * Authenticates a user
     * @param credentials - Login credentials
     * @returns Promise with authentication response
     */
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        // MOCK LOGIN - Remove this when you have a real backend
        if (credentials.email && credentials.password) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            return {
                user: {
                    id: '1',
                    email: credentials.email,
                    name: 'Demo User',
                    roles: ['user', 'admin'],
                },
                accessToken: 'mock-access-token-' + Date.now(),
                refreshToken: 'mock-refresh-token-' + Date.now(),
            };
        }

        throw new Error('Invalid credentials');

        // REAL API CALL - Uncomment when backend is ready
        // const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
        //   `${this.endpoint}/login`,
        //   credentials
        // );
        // return response.data.data;
    }

    /**
     * Registers a new user
     * @param data - Registration data
     * @returns Promise with authentication response
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        // MOCK REGISTER - Remove this when you have a real backend
        if (data.email && data.password && data.name) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            return {
                user: {
                    id: '2',
                    email: data.email,
                    name: data.name,
                    roles: ['user'],
                },
                accessToken: 'mock-access-token-' + Date.now(),
                refreshToken: 'mock-refresh-token-' + Date.now(),
            };
        }

        throw new Error('Registration failed');

        // REAL API CALL - Uncomment when backend is ready
        // const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
        //   `${this.endpoint}/register`,
        //   data
        // );
        // return response.data.data;
    }

    /**
     * Refreshes the access token
     * @param refreshToken - Refresh token
     * @returns Promise with new tokens
     */
    async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
        const response = await axiosInstance.post<ApiResponse<{ accessToken: string }>>(
            `${this.endpoint}/refresh`,
            { refreshToken }
        );
        return response.data.data;
    }
}

export const authService = new AuthService();
