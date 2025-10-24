/**
 * Authentication hook
 * Provides authentication methods and state
 */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';
import { authService } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../types/auth.types';
import { useNotification } from '@hooks/useNotification';
import { useTranslation } from 'react-i18next';

/**
 * Authentication hook return type
 */
interface UseAuthReturn {
    login: (credentials: LoginRequest) => Promise<unknown>;
    register: (data: RegisterRequest) => Promise<unknown>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

/**
 * Hook for authentication operations
 * @returns Authentication methods and state
 */
export const useAuth = (): UseAuthReturn => {
    const navigate = useNavigate();
    const { setAuth, clearAuth, isAuthenticated } = useAuthStore();
    const { showSuccess, showError } = useNotification();
    const { t } = useTranslation('messages');

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (response) => {
            setAuth(response.user, response.accessToken, response.refreshToken);
            showSuccess(t('login.success'));
            navigate('/dashboard');
        },
        onError: (error: Error) => {
            showError(error.message || t('login.error'));
        },
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            showSuccess(t('register.success'));
            navigate('/login');
        },
        onError: (error: Error) => {
            showError(error.message || t('register.error'));
        },
    });

    /**
     * Logs out the current user
     */
    const logout = (): void => {
        clearAuth();
        showSuccess(t('logout.success'));
        navigate('/login');
    };

    return {
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout,
        isLoading: loginMutation.isPending || registerMutation.isPending,
        isAuthenticated,
    };
};
