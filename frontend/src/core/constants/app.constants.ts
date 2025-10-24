/**
 * Application-wide constants
 * Defines constant values used throughout the application
 */

/**
 * Application metadata
 */
export const APP_NAME = 'Enterprise Application';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Enterprise-grade React TypeScript application';

/**
 * API configuration
 */
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;

/**
 * Pagination defaults
 */
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * Date and time formats
 */
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';

/**
 * File upload constraints
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

/**
 * Validation constraints
 */
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 50;

/**
 * UI constants
 */
export const DRAWER_WIDTH = 240;
export const APPBAR_HEIGHT = 64;
export const NOTIFICATION_DURATION = 3000; // 3 seconds

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER: 'user',
    THEME: 'theme',
    LANGUAGE: 'language',
} as const;

/**
 * Query keys for React Query
 */
export const QUERY_KEYS = {
    AUTH: 'auth',
    USER: 'user',
    USERS: 'users',
    PROFILE: 'profile',
    DASHBOARD: 'dashboard',
    SETTINGS: 'settings',
} as const;

/**
 * HTTP Status codes
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
] as const;

/**
 * User roles
 */
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
} as const;

/**
 * Environment variables with defaults
 */
export const ENV = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    APP_NAME: import.meta.env.VITE_APP_NAME || APP_NAME,
    APP_VERSION: import.meta.env.VITE_APP_VERSION || APP_VERSION,
} as const;
