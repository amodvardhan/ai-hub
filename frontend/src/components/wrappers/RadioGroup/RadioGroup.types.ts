/**
 * Type definitions for custom RadioGroup wrapper component
 */
import { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';

export interface RadioOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface CustomRadioGroupProps extends MuiRadioGroupProps {
    options: RadioOption[];
    label?: string;
    helperText?: string;
    error?: boolean;
}
