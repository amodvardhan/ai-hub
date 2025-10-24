/**
 * Type definitions for custom IconButton wrapper component
 */
import { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import { TooltipProps } from '@mui/material/Tooltip';

export interface CustomIconButtonProps extends MuiIconButtonProps {
    tooltip?: string;
    tooltipPlacement?: TooltipProps['placement'];
    loading?: boolean;
}
