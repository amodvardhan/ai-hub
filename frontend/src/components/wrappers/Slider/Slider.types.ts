/**
 * Type definitions for custom Slider wrapper component
 */
import { SliderProps as MuiSliderProps } from '@mui/material/Slider';

export interface CustomSliderProps extends MuiSliderProps {
    label?: string;
    helperText?: string;
    error?: boolean;
    showValue?: boolean;
}
