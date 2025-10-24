/**
 * Custom Autocomplete wrapper component
 * Wraps Material-UI Autocomplete with simplified API
 */
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { CustomAutocompleteProps, AutocompleteOption } from './Autocomplete.types';

/**
 * Enterprise autocomplete component
 * @param props - Autocomplete properties
 * @returns JSX Element
 */
export function Autocomplete<
    T extends AutocompleteOption,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
>({
    label,
    placeholder,
    helperText,
    error = false,
    required = false,
    textFieldProps,
    ...rest
}: CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
    return (
        <MuiAutocomplete
            {...rest}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    helperText={helperText}
                    error={error}
                    required={required}
                    {...textFieldProps}
                />
            )}
        />
    );
}

export default Autocomplete;
