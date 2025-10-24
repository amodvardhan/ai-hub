/**
 * Authentication configuration
 * Supports multiple authentication providers
 */

export enum AuthProvider {
    LOCAL = 'local',
    AZURE_AD = 'azure-ad',
}

export interface AuthConfig {
    provider: AuthProvider;
    useMockAzureAD: boolean;
    azureAd?: {
        clientId: string;
        authority: string;
        redirectUri: string;
        scopes: string[];
    };
}

/**
 * Get authentication configuration from environment
 */
export const getAuthConfig = (): AuthConfig => {
    const provider = (import.meta.env.VITE_AUTH_PROVIDER || 'local') as AuthProvider;
    const useMockAzureAD = import.meta.env.VITE_USE_MOCK_AZURE_AD === 'true';

    const config: AuthConfig = {
        provider,
        useMockAzureAD,
    };

    // Azure AD configuration - only validate if not using mock
    if (provider === AuthProvider.AZURE_AD && !useMockAzureAD) {
        config.azureAd = {
            clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
            authority: import.meta.env.VITE_AZURE_AUTHORITY || '',
            redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin,
            scopes: (import.meta.env.VITE_AZURE_SCOPES || 'User.Read').split(','),
        };

        // Validate Azure AD config
        if (!config.azureAd.clientId || !config.azureAd.authority) {
            console.error('❌ Azure AD configuration is incomplete');
            throw new Error('Azure AD configuration is missing required fields');
        }
    }

    const mode = useMockAzureAD ? 'Mock Azure AD' : provider === AuthProvider.AZURE_AD ? 'Real Azure AD' : 'Local';
    console.log(`✅ Auth provider initialized: ${mode}`);

    return config;
};

export const authConfig = getAuthConfig();
