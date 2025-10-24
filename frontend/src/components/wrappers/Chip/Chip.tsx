/**
 * Custom Chip wrapper component
 * Wraps Material-UI Chip with status variants
 */
import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import { CustomChipProps } from './Chip.types';

/**
 * Enterprise chip component with status support
 * @param props - Chip properties
 * @returns JSX Element
 */
export const Chip: React.FC<CustomChipProps> = ({ status, color, ...rest }) => {
    const getColor = (): 'success' | 'error' | 'warning' | 'info' | 'default' => {
        if (status) return status;
        return (color as any) || 'default';
    };

    return <MuiChip color={getColor()} {...rest} />;
};

export default Chip;
