/**
 * Type definitions for custom Autocomplete wrapper component
 */
import { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';
import { TextFieldProps } from '@mui/material/TextField';

export interface AutocompleteOption {
    label: string;
    value: string | number;
    [key: string]: any;
}

export interface CustomAutocompleteProps<
    T = AutocompleteOption,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
> extends Omit<
    MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
> {
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    required?: boolean;
    textFieldProps?: Partial<TextFieldProps>;
}
