/**
 * Custom Switch wrapper component
 * Wraps Material-UI Switch with label support
 */
import React from 'react';
import {
    Switch as MuiSwitch,
    FormControlLabel,
    FormHelperText,
    Box,
} from '@mui/material';
import { CustomSwitchProps } from './Switch.types';

/**
 * Enterprise switch component with label support
 * @param props - Switch properties
 * @returns JSX Element
 */
export const Switch: React.FC<CustomSwitchProps> = ({
    label,
    helperText,
    labelPlacement = 'end',
    ...rest
}) => {
    const switchElement = <MuiSwitch {...rest} />;

    if (!label && !helperText) {
        return switchElement;
    }

    return (
        <Box>
            {label ? (
                <FormControlLabel
                    control={switchElement}
                    label={label}
                    labelPlacement={labelPlacement}
                />
            ) : (
                switchElement
            )}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </Box>
    );
};

export default Switch;
