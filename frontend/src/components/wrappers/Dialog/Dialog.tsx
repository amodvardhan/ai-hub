/**
 * Custom Dialog wrapper component
 * Wraps Material-UI Dialog with consistent action buttons
 */
import React from 'react';
import {
    Dialog as MuiDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Button } from '../Button';
import { CustomDialogProps } from './Dialog.types';

/**
 * Enterprise dialog component with actions
 * @param props - Dialog properties
 * @returns JSX Element
 */
export const Dialog: React.FC<CustomDialogProps> = ({
    title,
    children,
    onClose,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    showActions = true,
    loading = false,
    maxWidth = 'sm',
    ...rest
}) => {
    return (
        <MuiDialog onClose={onClose} maxWidth={maxWidth} fullWidth {...rest}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
            {showActions && (
                <DialogActions>
                    <Button onClick={onClose} variant="outlined" disabled={loading}>
                        {cancelText}
                    </Button>
                    {onConfirm && (
                        <Button onClick={onConfirm} variant="primary" loading={loading}>
                            {confirmText}
                        </Button>
                    )}
                </DialogActions>
            )}
        </MuiDialog>
    );
};

export default Dialog;
