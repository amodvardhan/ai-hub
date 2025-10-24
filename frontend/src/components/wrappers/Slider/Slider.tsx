/**
 * Custom Slider wrapper component
 * Wraps Material-UI Slider with label support
 */
import React from 'react';
import {
    Slider as MuiSlider,
    FormLabel,
    FormHelperText,
    Box,
    Typography,
} from '@mui/material';
import { CustomSliderProps } from './Slider.types';

/**
 * Enterprise slider component with label support
 * @param props - Slider properties
 * @returns JSX Element
 */
export const Slider: React.FC<CustomSliderProps> = ({
    label,
    helperText,
    error = false,
    showValue = false,
    value,
    ...rest
}) => {
    return (
        <Box sx={{ width: '100%' }}>
            {label && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <FormLabel error={error}>{label}</FormLabel>
                    {showValue && <Typography variant="body2">{value}</Typography>}
                </Box>
            )}
            <MuiSlider value={value} {...rest} />
            {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </Box>
    );
};

export default Slider;
