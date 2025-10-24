/**
 * Type definitions for custom Checkbox wrapper component
 */
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

export interface CustomCheckboxProps extends MuiCheckboxProps {
    label?: string;
    helperText?: string;
    error?: boolean;
}
