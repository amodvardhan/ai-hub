/**
 * Notification provider wrapper component
 * Configures notistack for application-wide notifications
 */
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Notification provider props
 */
interface NotificationProviderProps {
    children: React.ReactNode;
}

/**
 * Notification provider component
 * @param props - Provider properties
 * @returns JSX Element
 */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const notistackRef = React.createRef<SnackbarProvider>();

    /**
     * Closes a specific notification
     * @param key - Notification key
     */
    const onClickDismiss = (key: string | number) => (): void => {
        notistackRef.current?.closeSnackbar(key);
    };

    return (
        <SnackbarProvider
            ref={notistackRef}
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            action={(key) => (
                <IconButton size="small" color="inherit" onClick={onClickDismiss(key)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        >
            {children}
        </SnackbarProvider>
    );
};

export default NotificationProvider;
