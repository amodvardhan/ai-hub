/**
 * Authentication service
 * Supports multiple auth providers (Local, Azure AD, Mock Azure AD)
 */
import { BaseService } from '@services/base.service';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';
import { authConfig, AuthProvider } from '@core/config/auth.config';
import { azureADService } from './azure-ad.service';
import { mockAzureADService } from './mock-azure-ad.service';
import { mockAuthService } from './mock-auth.service';
import { axiosInstance } from '@core/config/axios.config';

class AuthService extends BaseService<any> {
    constructor() {
        super('/auth');
    }

    /**
     * Get the appropriate Azure AD service (real or mock)
     */
    private getAzureADService() {
        return authConfig.useMockAzureAD ? mockAzureADService : azureADService;
    }

    /**
     * Check if we should use mock auth
     */
    private shouldUseMock(): boolean {
        return import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true';
    }

    /**
     * Initialize authentication
     */
    async initialize(): Promise<void> {
        if (authConfig.provider === AuthProvider.AZURE_AD) {
            const azureService = this.getAzureADService();
            await azureService.initialize();

            if (authConfig.useMockAzureAD) {
                console.log('✅ Mock Azure AD initialized (Development mode)');
            } else {
                console.log('✅ Real Azure AD initialized');
            }
        } else if (this.shouldUseMock()) {
            console.log('✅ Mock auth initialized (Development mode)');
        } else {
            console.log('✅ Local auth initialized');
        }
    }

    /**
     * Login - supports Azure AD (real/mock), Mock, and Real API
     */
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        // Azure AD Login (real or mock)
        if (authConfig.provider === AuthProvider.AZURE_AD) {
            const azureService = this.getAzureADService();
            await azureService.loginWithPopup();
            const token = await azureService.getAccessToken();
            const userInfo = azureService.getUserInfo();

            return {
                user: userInfo,
                accessToken: token,
                refreshToken: '', // Azure AD handles token refresh
            };
        }

        // Mock Login (Development)
        if (this.shouldUseMock()) {
            return mockAuthService.login(credentials);
        }

        // Real API Login
        const response = await axiosInstance.post(`${this.endpoint}/login`, credentials);
        return response.data.data;
    }


    /**
     * Register - only for local/mock auth
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        if (authConfig.provider === AuthProvider.AZURE_AD) {
            throw new Error('Registration not supported with Azure AD');
        }

        // Mock Register (Development)
        if (this.shouldUseMock()) {
            return mockAuthService.register(data);
        }

        // Real API Register
        const response = await axiosInstance.post(`${this.endpoint}/register`, data);
        return response.data.data;
    }

    /**
     * Logout
     */
    async logout(): Promise<void> {
        if (authConfig.provider === AuthProvider.AZURE_AD) {
            const azureService = this.getAzureADService();
            await azureService.logout();
            return;
        }

        if (this.shouldUseMock()) {
            await mockAuthService.logout();
            return;
        }

        // Real API Logout
        await axiosInstance.post(`${this.endpoint}/logout`);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        if (authConfig.provider === AuthProvider.AZURE_AD) {
            const azureService = this.getAzureADService();
            return azureService.isAuthenticated();
        }
        return false;
    }

    /**
     * Get current user
     */
    async getCurrentUser(): Promise<any> {
        if (authConfig.provider === AuthProvider.AZURE_AD) {
            const azureService = this.getAzureADService();
            return azureService.getUserInfo();
        }

        if (this.shouldUseMock()) {
            return mockAuthService.getCurrentUser();
        }

        const response = await axiosInstance.get(`${this.endpoint}/me`);
        return response.data.data;
    }
}

export const authService = new AuthService();
