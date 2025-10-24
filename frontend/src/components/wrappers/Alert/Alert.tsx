/**
 * Custom Alert wrapper component
 * Wraps Material-UI Alert with close button support
 */
import React from 'react';
import { Alert as MuiAlert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CustomAlertProps } from './Alert.types';

/**
 * Enterprise alert component with close button
 * @param props - Alert properties
 * @returns JSX Element
 */
export const Alert: React.FC<CustomAlertProps> = ({
    children,
    onClose,
    showCloseButton = true,
    action,
    ...rest
}) => {
    const closeAction = showCloseButton && onClose ? (
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    ) : action;

    return (
        <MuiAlert action={closeAction} {...rest}>
            {children}
        </MuiAlert>
    );
};

export default Alert;
