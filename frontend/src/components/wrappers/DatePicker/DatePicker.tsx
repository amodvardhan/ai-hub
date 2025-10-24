/**
 * Custom DatePicker wrapper component
 * Simple date picker using HTML5 date input
 */
import React from 'react';
import { TextField } from '@mui/material';
import { CustomDatePickerProps } from './DatePicker.types';

/**
 * Enterprise date picker component
 * @param props - DatePicker properties
 * @returns JSX Element
 */
export const DatePicker: React.FC<CustomDatePickerProps> = ({
    label,
    value,
    onChange,
    helperText,
    error = false,
    disabled = false,
    minDate,
    maxDate,
    fullWidth = true,
    textFieldProps,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value ? new Date(event.target.value) : null;
        onChange(newValue);
    };

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    return (
        <TextField
            type="date"
            label={label}
            value={formatDate(value)}
            onChange={handleChange}
            helperText={helperText}
            error={error}
            disabled={disabled}
            fullWidth={fullWidth}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                min: minDate ? formatDate(minDate) : undefined,
                max: maxDate ? formatDate(maxDate) : undefined,
            }}
            {...textFieldProps}
        />
    );
};

export default DatePicker;
