/**
 * Mock Azure AD Service
 * Simulates Azure AD authentication for development
 */

class MockAzureADService {
    private mockUser = {
        id: 'mock-azure-user-id',
        name: 'John Doe (Azure AD)',
        email: 'john.doe@company.com',
        roles: ['user'],
    };

    /**
     * Initialize - does nothing in mock mode
     */
    async initialize(): Promise<void> {
        console.log('✅ Mock Azure AD initialized');
    }

    /**
     * Mock login with popup
     */
    async loginWithPopup(): Promise<any> {
        // Simulate popup delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('🔐 Mock Azure AD login successful');

        return {
            account: {
                localAccountId: this.mockUser.id,
                name: this.mockUser.name,
                username: this.mockUser.email,
            },
        };
    }

    /**
     * Mock login with redirect
     */
    async loginWithRedirect(): Promise<void> {
        await this.loginWithPopup();
    }

    /**
     * Get mock access token
     */
    async getAccessToken(): Promise<string> {
        return 'mock-azure-ad-access-token-' + Date.now();
    }

    /**
     * Get mock account
     */
    getAccount(): any {
        return {
            localAccountId: this.mockUser.id,
            name: this.mockUser.name,
            username: this.mockUser.email,
        };
    }

    /**
     * Check if authenticated
     */
    isAuthenticated(): boolean {
        return false; // Always false until actual login
    }

    /**
     * Mock logout
     */
    async logout(): Promise<void> {
        console.log('👋 Mock Azure AD logout');
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    /**
     * Get user info
     */
    getUserInfo(): any {
        return this.mockUser;
    }
}

export const mockAzureADService = new MockAzureADService();
