/**
 * Custom TextField wrapper component
 * Wraps Material-UI TextField with enterprise-specific defaults
 */
import React from 'react';
import { TextField as MuiTextField, FormHelperText, Box, InputAdornment } from '@mui/material';
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
    startAdornment,
    endAdornment,
    ...rest
}) => {
    const charCount = String(value).length;

    const InputProps = {
        ...rest.InputProps,
        startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : rest.InputProps?.startAdornment,
        endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : rest.InputProps?.endAdornment,
    };

    return (
        <Box>
            <MuiTextField
                variant={variant}
                value={value}
                inputProps={{
                    maxLength,
                    ...rest.inputProps,
                }}
                InputProps={InputProps}
                {...rest}
                helperText={helperText}
            />
            {showCharCount && maxLength && (
                <FormHelperText sx={{ textAlign: 'right' }}>
                    {charCount}/{maxLength} characters
                </FormHelperText>
            )}
        </Box>
    );
};

export default TextField;
