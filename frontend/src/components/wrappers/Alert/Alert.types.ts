/**
 * Type definitions for custom Alert wrapper component
 */
import { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export interface CustomAlertProps extends MuiAlertProps {
    onClose?: () => void;
    showCloseButton?: boolean;
}
