/**
 * Custom RadioGroup wrapper component
 * Wraps Material-UI RadioGroup with options array support
 */
import React from 'react';
import {
    RadioGroup as MuiRadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    FormHelperText,
} from '@mui/material';
import { CustomRadioGroupProps } from './RadioGroup.types';

/**
 * Enterprise radio group component with options array support
 * @param props - RadioGroup properties
 * @returns JSX Element
 */
export const RadioGroup: React.FC<CustomRadioGroupProps> = ({
    options,
    label,
    helperText,
    error = false,
    ...rest
}) => {
    return (
        <FormControl component="fieldset" error={error}>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <MuiRadioGroup {...rest}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        disabled={option.disabled}
                    />
                ))}
            </MuiRadioGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default RadioGroup;
