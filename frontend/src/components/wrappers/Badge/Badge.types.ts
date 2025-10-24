/**
 * Type definitions for custom Badge wrapper component
 */
import { BadgeProps as MuiBadgeProps } from '@mui/material/Badge';

export interface CustomBadgeProps extends MuiBadgeProps {
    status?: 'online' | 'offline' | 'away' | 'busy';
}
