/**
 * Authentication store using Zustand
 * Manages authentication state and user data
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User interface
 */
export interface User {
    id: string;
    email: string;
    name: string;
    roles: string[];
}

/**
 * Authentication state interface
 */
interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, accessToken: string, refreshToken: string) => void;
    clearAuth: () => void;
}

/**
 * Authentication store
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            /**
             * Sets authentication data
             * @param user - User data
             * @param accessToken - Access token
             * @param refreshToken - Refresh token
             */
            setAuth: (user, accessToken, refreshToken) => {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                });
            },

            /**
             * Clears authentication data
             */
            clearAuth: () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
