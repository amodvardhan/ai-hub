/**
 * Custom Checkbox wrapper component
 * Wraps Material-UI Checkbox with label and helper text support
 */
import React from 'react';
import {
    Checkbox as MuiCheckbox,
    FormControlLabel,
    FormHelperText,
    Box,
} from '@mui/material';
import { CustomCheckboxProps } from './Checkbox.types';

/**
 * Enterprise checkbox component with label support
 * @param props - Checkbox properties
 * @returns JSX Element
 */
export const Checkbox: React.FC<CustomCheckboxProps> = ({
    label,
    helperText,
    error = false,
    ...rest
}) => {
    const checkboxElement = <MuiCheckbox {...rest} color={error ? 'error' : rest.color} />;

    if (!label && !helperText) {
        return checkboxElement;
    }

    return (
        <Box>
            {label ? (
                <FormControlLabel control={checkboxElement} label={label} />
            ) : (
                checkboxElement
            )}
            {helperText && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            )}
        </Box>
    );
};

export default Checkbox;
