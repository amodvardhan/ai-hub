/**
 * Azure AD Authentication Service
 * Handles Microsoft Azure Active Directory authentication
 */
import {
    PublicClientApplication,
    AccountInfo,
    AuthenticationResult,
    InteractionRequiredAuthError,
} from '@azure/msal-browser';
import { authConfig } from '@core/config/auth.config';

class AzureADService {
    private msalInstance: PublicClientApplication | null = null;

    /**
     * Initialize MSAL instance
     */
    async initialize(): Promise<void> {
        if (!authConfig.azureAd) {
            throw new Error('Azure AD configuration not found');
        }

        this.msalInstance = new PublicClientApplication({
            auth: {
                clientId: authConfig.azureAd.clientId,
                authority: authConfig.azureAd.authority,
                redirectUri: authConfig.azureAd.redirectUri,
            },
            cache: {
                cacheLocation: 'sessionStorage',
                storeAuthStateInCookie: false,
            },
        });

        await this.msalInstance.initialize();
        await this.handleRedirectPromise();
    }

    /**
     * Handle redirect after login
     */
    private async handleRedirectPromise(): Promise<void> {
        if (!this.msalInstance) return;

        try {
            const response = await this.msalInstance.handleRedirectPromise();
            if (response) {
                this.msalInstance.setActiveAccount(response.account);
            }
        } catch (error) {
            console.error('Error handling redirect:', error);
        }
    }

    /**
     * Login with popup
     */
    async loginWithPopup(): Promise<AuthenticationResult> {
        if (!this.msalInstance) {
            throw new Error('MSAL instance not initialized');
        }

        try {
            const response = await this.msalInstance.loginPopup({
                scopes: authConfig.azureAd?.scopes || ['User.Read'],
            });

            this.msalInstance.setActiveAccount(response.account);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    /**
     * Login with redirect
     */
    async loginWithRedirect(): Promise<void> {
        if (!this.msalInstance) {
            throw new Error('MSAL instance not initialized');
        }

        await this.msalInstance.loginRedirect({
            scopes: authConfig.azureAd?.scopes || ['User.Read'],
        });
    }

    /**
     * Get access token silently
     */
    async getAccessToken(): Promise<string> {
        if (!this.msalInstance) {
            throw new Error('MSAL instance not initialized');
        }

        const account = this.getAccount();
        if (!account) {
            throw new Error('No active account');
        }

        try {
            const response = await this.msalInstance.acquireTokenSilent({
                scopes: authConfig.azureAd?.scopes || ['User.Read'],
                account,
            });
            return response.accessToken;
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                // Fallback to interactive method
                const response = await this.msalInstance.acquireTokenPopup({
                    scopes: authConfig.azureAd?.scopes || ['User.Read'],
                });
                return response.accessToken;
            }
            throw error;
        }
    }

    /**
     * Get current account
     */
    getAccount(): AccountInfo | null {
        if (!this.msalInstance) return null;

        const accounts = this.msalInstance.getAllAccounts();
        return accounts.length > 0 ? accounts[0] : null;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.getAccount() !== null;
    }

    /**
     * Logout
     */
    async logout(): Promise<void> {
        if (!this.msalInstance) return;

        await this.msalInstance.logoutPopup();
    }

    /**
     * Get user info
     */
    getUserInfo(): any {
        const account = this.getAccount();
        if (!account) return null;

        return {
            id: account.localAccountId,
            name: account.name || '',
            email: account.username || '',
            roles: [], // Get from token claims if needed
        };
    }
}

export const azureADService = new AzureADService();
