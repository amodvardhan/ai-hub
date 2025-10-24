/**
 * Type definitions for custom Chip wrapper component
 */
import { ChipProps as MuiChipProps } from '@mui/material/Chip';

export interface CustomChipProps extends MuiChipProps {
    status?: 'success' | 'error' | 'warning' | 'info' | 'default';
}
