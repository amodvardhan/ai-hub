/**
 * Custom Select wrapper component
 * Wraps Material-UI Select with simplified options API
 */
import React from 'react';
import {
    Select as MuiSelect,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { CustomSelectProps } from './Select.types';

/**
 * Enterprise select component with options array support
 * @param props - Select properties
 * @returns JSX Element
 */
export const Select: React.FC<CustomSelectProps> = ({
    options,
    label,
    helperText,
    error = false,
    variant = 'outlined',
    fullWidth = true,
    ...rest
}) => {
    const labelId = `${rest.id || 'select'}-label`;

    return (
        <FormControl variant={variant} fullWidth={fullWidth} error={error}>
            {label && <InputLabel id={labelId}>{label}</InputLabel>}
            <MuiSelect labelId={labelId} label={label} {...rest}>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default Select;
