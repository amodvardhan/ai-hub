/**
 * Type definitions for custom TextField wrapper component
 */
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

/**
 * Extended text field properties with custom options
 */
export interface CustomTextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
    /**
     * Field variant
     */
    variant?: 'outlined' | 'filled' | 'standard';

    /**
     * Show character count
     */
    showCharCount?: boolean;

    /**
     * Maximum character length
     */
    maxLength?: number;
}
