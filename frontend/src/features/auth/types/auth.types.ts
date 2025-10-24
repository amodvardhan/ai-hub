/**
 * Authentication type definitions
 */
import { User } from '@store/auth.store';

/**
 * Login request payload
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Register request payload
 */
export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

/**
 * Authentication response
 */
export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
