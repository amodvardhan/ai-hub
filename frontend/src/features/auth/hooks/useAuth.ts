/**
 * Authentication hook
 * Supports multiple auth providers
 */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@store/auth.store';
import { useNotification } from '@hooks/useNotification';
import { LoginRequest, RegisterRequest } from '../types/auth.types';
import { authConfig, AuthProvider } from '@core/config/auth.config';

export const useAuth = () => {
    const navigate = useNavigate();
    const { setAuth, clearAuth } = useAuthStore();
    const { showSuccess, showError } = useNotification();

    // Local login
    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onSuccess: (response) => {
            setAuth(response.user, response.accessToken, response.refreshToken);
            showSuccess('Login successful!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            showError(error.message || 'Login failed');
        },
    });

    // Azure AD login
    const azureLoginMutation = useMutation({
        mutationFn: () => authService.login({} as LoginRequest), // Triggers Azure AD flow
        onSuccess: (response) => {
            setAuth(response.user, response.accessToken, response.refreshToken);
            showSuccess('Signed in with Microsoft successfully!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            showError(error.message || 'Azure AD login failed');
        },
    });

    // Register (local only)
    const registerMutation = useMutation({
        mutationFn: (data: RegisterRequest) => authService.register(data),
        onSuccess: (response) => {
            setAuth(response.user, response.accessToken, response.refreshToken);
            showSuccess('Registration successful!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            showError(error.message || 'Registration failed');
        },
    });

    // Logout
    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            clearAuth();
            showSuccess('Logged out successfully');
            navigate('/login');
        },
        onError: (error: any) => {
            showError(error.message || 'Logout failed');
        },
    });

    return {
        login: loginMutation.mutateAsync,
        loginWithAzureAD: azureLoginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        isLoading:
            loginMutation.isPending ||
            azureLoginMutation.isPending ||
            registerMutation.isPending ||
            logoutMutation.isPending,
        isAzureAD: authConfig.provider === AuthProvider.AZURE_AD,
    };
};
