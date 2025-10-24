/**
 * Material-UI theme configuration
 * Defines custom theme with typography, colors, and component overrides
 */
import { createTheme, Theme, ThemeOptions, PaletteMode } from '@mui/material/styles';

/**
 * Creates theme based on provided mode
 * @param mode - Theme mode (light or dark)
 * @returns Configured theme
 */
export const createAppTheme = (mode: PaletteMode): Theme => {
    const themeOptions: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#1976d2' : '#90caf9',
                light: mode === 'light' ? '#42a5f5' : '#a6d4fa',
                dark: mode === 'light' ? '#1565c0' : '#648dae',
                contrastText: '#ffffff',
            },
            secondary: {
                main: mode === 'light' ? '#dc004e' : '#f48fb1',
                light: mode === 'light' ? '#e33371' : '#f6a5c0',
                dark: mode === 'light' ? '#9a0036' : '#aa647b',
                contrastText: '#ffffff',
            },
            error: {
                main: '#f44336',
            },
            warning: {
                main: '#ff9800',
            },
            info: {
                main: '#2196f3',
            },
            success: {
                main: '#4caf50',
            },
            background: {
                default: mode === 'light' ? '#f5f5f5' : '#121212',
                paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
            },
            text: {
                primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
                secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            },
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ].join(','),
            h1: {
                fontSize: '2.5rem',
                fontWeight: 600,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 600,
            },
            h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
            },
            h4: {
                fontSize: '1.5rem',
                fontWeight: 600,
            },
            h5: {
                fontSize: '1.25rem',
                fontWeight: 600,
            },
            h6: {
                fontSize: '1rem',
                fontWeight: 600,
            },
        },
        spacing: 8,
        shape: {
            borderRadius: 8,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600,
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                    size: 'medium',
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: mode === 'light'
                            ? '0 2px 8px rgba(0,0,0,0.1)'
                            : '0 2px 8px rgba(0,0,0,0.3)',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
        },
    };

    return createTheme(themeOptions);
};

// Default theme export (light mode)
export const theme = createAppTheme('light');
