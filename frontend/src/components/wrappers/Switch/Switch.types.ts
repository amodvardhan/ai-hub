/**
 * Type definitions for custom Switch wrapper component
 */
import { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

export interface CustomSwitchProps extends MuiSwitchProps {
    label?: string;
    helperText?: string;
    labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
}
