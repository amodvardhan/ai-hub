/**
 * Type definitions for custom Tooltip wrapper component
 */
import { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

export interface CustomTooltipProps extends MuiTooltipProps {
    maxWidth?: number;
}
