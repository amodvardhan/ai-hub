/**
 * Custom Button wrapper component
 * Wraps Material-UI Button with enterprise-specific defaults and loading state
 */
import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { CustomButtonProps } from './Button.types';

/**
 * Enterprise button component with loading state support
 * @param props - Button properties
 * @returns JSX Element
 */
export const Button: React.FC<CustomButtonProps> = ({
    children,
    loading = false,
    disabled = false,
    variant = 'contained',
    startIcon,
    endIcon,
    ...rest
}) => {
    const getMuiVariant = (): 'contained' | 'outlined' | 'text' => {
        switch (variant) {
            case 'primary':
            case 'secondary':
                return 'contained';
            default:
                return variant;
        }
    };

    const getColor = (): 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning' => {
        if (variant === 'primary') return 'primary';
        if (variant === 'secondary') return 'secondary';
        return rest.color || 'primary';
    };

    return (
        <MuiButton
            variant={getMuiVariant()}
            color={getColor()}
            disabled={disabled || loading}
            startIcon={loading ? <CircularProgress size={20} /> : startIcon}
            endIcon={endIcon}
            {...rest}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
