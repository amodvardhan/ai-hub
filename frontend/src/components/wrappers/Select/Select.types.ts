/**
 * Type definitions for custom Select wrapper component
 */
import { SelectProps as MuiSelectProps } from '@mui/material/Select';

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface CustomSelectProps extends Omit<MuiSelectProps, 'variant'> {
    variant?: 'outlined' | 'filled' | 'standard';
    options: SelectOption[];
    helperText?: string;
    error?: boolean;
}
