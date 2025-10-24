/**
 * Type definitions for custom Card wrapper component
 */
import { CardProps as MuiCardProps } from '@mui/material/Card';

export interface CustomCardProps extends MuiCardProps {
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
    loading?: boolean;
    hoverable?: boolean;
}
