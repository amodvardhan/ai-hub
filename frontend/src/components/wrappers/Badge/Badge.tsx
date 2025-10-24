/**
 * Custom Badge wrapper component
 * Wraps Material-UI Badge with status support
 */
import React from 'react';
import { Badge as MuiBadge } from '@mui/material';
import { CustomBadgeProps } from './Badge.types';

/**
 * Enterprise badge component with status variants
 * @param props - Badge properties
 * @returns JSX Element
 */
export const Badge: React.FC<CustomBadgeProps> = ({ status, color, ...rest }) => {
    const getColor = (): 'success' | 'error' | 'warning' | 'info' | 'default' | 'primary' | 'secondary' => {
        if (status === 'online') return 'success';
        if (status === 'offline') return 'default';
        if (status === 'away') return 'warning';
        if (status === 'busy') return 'error';
        return (color as any) || 'primary';
    };

    return <MuiBadge color={getColor()} {...rest} />;
};

export default Badge;
