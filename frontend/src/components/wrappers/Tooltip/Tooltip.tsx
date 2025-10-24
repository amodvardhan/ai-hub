/**
 * Custom Tooltip wrapper component
 * Wraps Material-UI Tooltip with maxWidth support
 */
import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';
import { CustomTooltipProps } from './Tooltip.types';

/**
 * Enterprise tooltip component with maxWidth
 * @param props - Tooltip properties
 * @returns JSX Element
 */
export const Tooltip: React.FC<CustomTooltipProps> = ({
    maxWidth = 300,
    children,
    ...rest
}) => {
    return (
        <MuiTooltip
            componentsProps={{
                tooltip: {
                    sx: {
                        maxWidth,
                    },
                },
            }}
            {...rest}
        >
            {children}
        </MuiTooltip>
    );
};

export default Tooltip;
