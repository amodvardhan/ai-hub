/**
 * Type definitions for custom Dialog wrapper component
 */
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

export interface CustomDialogProps extends MuiDialogProps {
    title?: string;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    showActions?: boolean;
    loading?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
