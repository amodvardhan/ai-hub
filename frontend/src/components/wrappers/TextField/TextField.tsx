/**
 * Custom TextField wrapper component
 * Wraps Material-UI TextField with enterprise-specific defaults
 */
import React from 'react';
import { TextField as MuiTextField, FormHelperText, Box } from '@mui/material';
import { CustomTextFieldProps } from './TextField.types';

/**
 * Enterprise text field component with character count support
 * @param props - TextField properties
 * @returns JSX Element
 */
export const TextField: React.FC<CustomTextFieldProps> = ({
    showCharCount = false,
    maxLength,
    value = '',
    helperText,
    variant = 'outlined',
    ...rest
}) => {
    const charCount = String(value).length;

    return (
        <Box>
            <MuiTextField
                variant={variant}
                value={value}
                inputProps={{
                    maxLength,
                    ...rest.inputProps,
                }}
                {...rest}
            />
            {showCharCount && maxLength && (
                <FormHelperText>
                    {charCount}/{maxLength} characters
                </FormHelperText>
            )}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </Box>
    );
};

export default TextField;
