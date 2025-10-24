/**
 * Custom hook for managing notifications
 * Provides methods to display success, error, warning, and info notifications
 */
import { useSnackbar, VariantType } from 'notistack';
// import { useTranslation } from 'react-i18next';

/**
 * Notification hook return type
 */
interface UseNotificationReturn {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showWarning: (message: string) => void;
    showInfo: (message: string) => void;
}

/**
 * Hook for displaying notifications
 * @returns Notification methods
 */
export const useNotification = (): UseNotificationReturn => {
    const { enqueueSnackbar } = useSnackbar();
    // const { t } = useTranslation();

    /**
     * Shows a notification with the specified variant
     * @param message - Message to display
     * @param variant - Notification variant
     */
    const showNotification = (message: string, variant: VariantType): void => {
        enqueueSnackbar(message, {
            variant,
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
    };

    return {
        showSuccess: (message: string) => showNotification(message, 'success'),
        showError: (message: string) => showNotification(message, 'error'),
        showWarning: (message: string) => showNotification(message, 'warning'),
        showInfo: (message: string) => showNotification(message, 'info'),
    };
};
