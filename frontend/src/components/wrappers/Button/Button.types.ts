/**
 * Type definitions for custom Button wrapper component
 */
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

/**
 * Extended button properties with custom options
 */
export interface CustomButtonProps extends Omit<MuiButtonProps, 'variant'> {
    /**
     * Button variant - extends MUI variants with custom options
     */
    variant?: 'contained' | 'outlined' | 'text' | 'primary' | 'secondary';

    /**
     * Loading state indicator
     */
    loading?: boolean;

    /**
     * Icon to display before button text
     */
    startIcon?: React.ReactNode;

    /**
     * Icon to display after button text
     */
    endIcon?: React.ReactNode;
}
