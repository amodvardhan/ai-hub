/**
 * Type definitions for custom TextField wrapper component
 */
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export interface CustomTextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
    variant?: 'outlined' | 'filled' | 'standard';
    showCharCount?: boolean;
    maxLength?: number;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}
