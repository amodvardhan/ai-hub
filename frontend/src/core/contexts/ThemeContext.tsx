/**
 * Theme context for managing light/dark mode
 * Provides theme switching functionality across the application
 */
import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { createAppTheme } from '@core/config/theme.config';

/**
 * Theme mode type
 */
type ThemeMode = 'light' | 'dark';

/**
 * Theme context interface
 */
interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

/**
 * Theme context
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider props
 */
interface ThemeContextProviderProps {
    children: React.ReactNode;
}

/**
 * Theme context provider component
 * Uses the existing theme configuration from theme.config.ts
 * @param props - Provider props
 * @returns JSX Element
 */
export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const [mode, setMode] = useLocalStorage<ThemeMode>('theme-mode', 'light');

    /**
     * Toggles between light and dark mode
     */
    const toggleTheme = (): void => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    /**
     * Sets specific theme mode
     * @param newMode - Theme mode to set
     */
    const setTheme = (newMode: ThemeMode): void => {
        setMode(newMode);
    };

    /**
     * Creates theme using existing theme configuration
     * Only recalculates when mode changes
     */
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    const value = useMemo(
        () => ({
            mode,
            toggleTheme,
            setTheme,
        }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

/**
 * Custom hook to use theme context
 * @returns Theme context value
 */
export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
};
