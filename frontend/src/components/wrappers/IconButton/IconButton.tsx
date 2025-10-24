/**
 * Custom IconButton wrapper component
 * Wraps Material-UI IconButton with tooltip support
 */
import React from 'react';
import { IconButton as MuiIconButton, Tooltip, CircularProgress } from '@mui/material';
import { CustomIconButtonProps } from './IconButton.types';

/**
 * Enterprise icon button component with tooltip support
 * @param props - IconButton properties
 * @returns JSX Element
 */
export const IconButton: React.FC<CustomIconButtonProps> = ({
    tooltip,
    tooltipPlacement = 'top',
    loading = false,
    children,
    disabled,
    ...rest
}) => {
    const button = (
        <MuiIconButton disabled={disabled || loading} {...rest}>
            {loading ? <CircularProgress size={20} /> : children}
        </MuiIconButton>
    );

    if (tooltip && !disabled && !loading) {
        return (
            <Tooltip title={tooltip} placement={tooltipPlacement}>
                {button}
            </Tooltip>
        );
    }

    return button;
};

export default IconButton;
