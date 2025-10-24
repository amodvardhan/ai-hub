/**
 * Type definitions for custom DatePicker wrapper component
 */
import { TextFieldProps } from '@mui/material/TextField';

export interface CustomDatePickerProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    helperText?: string;
    error?: boolean;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    format?: string;
    fullWidth?: boolean;
    textFieldProps?: Partial<TextFieldProps>;
}
