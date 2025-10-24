/**
 * Mock Authentication Service
 * For development/testing without backend
 */
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';

const MOCK_USERS = [
    {
        id: '1',
        name: 'John Doe',
        email: 'admin@example.com',
        password: 'admin123',
        roles: ['admin', 'user'],
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'user@example.com',
        password: 'user123',
        roles: ['user'],
    },
];

class MockAuthService {
    /**
     * Mock login - accepts any email/password
     */
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find user or use default
        const user = MOCK_USERS.find((u) => u.email === credentials.email) || MOCK_USERS[0];

        // For demo purposes, accept any password
        // In real scenario, check password
        if (credentials.password.length < 3) {
            throw new Error('Invalid credentials');
        }

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
            },
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
        };
    }

    /**
     * Mock register
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            user: {
                id: Date.now().toString(),
                name: data.name,
                email: data.email,
                roles: ['user'],
            },
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
        };
    }

    /**
     * Mock logout
     */
    async logout(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    /**
     * Get current user
     */
    async getCurrentUser(): Promise<any> {
        return MOCK_USERS[0];
    }
}

export const mockAuthService = new MockAuthService();
