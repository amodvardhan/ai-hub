/**
 * Validation utility functions
 * Provides common validation functions for forms and data
 */

/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/\d/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one number' };
    }
    if (!/[@$!%*?&#]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one special character' };
    }
    return { isValid: true, message: 'Password is strong' };
};

/**
 * Validates phone number format
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
};

/**
 * Validates URL format
 * @param url - URL to validate
 * @returns True if valid, false otherwise
 */
export const validateUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validates if string contains only alphanumeric characters
 * @param str - String to validate
 * @returns True if valid, false otherwise
 */
export const isAlphanumeric = (str: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(str);
};

/**
 * Validates if string is a valid date
 * @param dateString - Date string to validate
 * @returns True if valid, false otherwise
 */
export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Validates minimum length
 * @param value - Value to validate
 * @param minLength - Minimum length
 * @returns True if valid, false otherwise
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
    return value.length >= minLength;
};

/**
 * Validates maximum length
 * @param value - Value to validate
 * @param maxLength - Maximum length
 * @returns True if valid, false otherwise
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
    return value.length <= maxLength;
};

/**
 * Validates if value is a number
 * @param value - Value to validate
 * @returns True if valid number, false otherwise
 */
export const isNumeric = (value: string): boolean => {
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};

/**
 * Validates if value is within range
 * @param value - Value to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if within range, false otherwise
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};

/**
 * Validates required field
 * @param value - Value to validate
 * @returns True if not empty, false otherwise
 */
export const isRequired = (value: string | number | boolean | null | undefined): boolean => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return !isNaN(value);
    return value !== null && value !== undefined;
};
