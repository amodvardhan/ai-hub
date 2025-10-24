/**
 * Settings page component
 * Application settings management interface with localStorage persistence
 */
import React from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    FormGroup,
    FormControlLabel,
    Switch,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useThemeContext } from '@core/contexts';
import { SUPPORTED_LANGUAGES } from '@core/constants/app.constants';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/**
 * Settings interface
 */
interface AppSettings {
    notifications: boolean;
    emailAlerts: boolean;
    soundEnabled: boolean;
    autoSave: boolean;
}

/**
 * Settings page component
 * @returns JSX Element
 */
const Settings: React.FC = () => {
    const { t, i18n } = useTranslation('common');
    const { mode, toggleTheme } = useThemeContext();

    // Use localStorage for persisting settings
    const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', {
        notifications: true,
        emailAlerts: true,
        soundEnabled: false,
        autoSave: true,
    });

    /**
     * Updates a specific setting
     * @param key - Setting key to update
     * @param value - New value
     */
    const updateSetting = (key: keyof AppSettings, value: boolean): void => {
        setSettings(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    /**
     * Changes application language
     * @param language - Language code
     */
    const handleLanguageChange = (language: string): void => {
        i18n.changeLanguage(language);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('navigation.settings')}
            </Typography>

            <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
                All settings are automatically saved to your browser's localStorage
            </Alert>

            {/* Appearance Settings */}
            <Paper sx={{ p: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                        Appearance
                    </Typography>
                    <Chip
                        icon={mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                        label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                        color={mode === 'dark' ? 'default' : 'primary'}
                        size="small"
                    />
                </Box>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={mode === 'dark'}
                                onChange={toggleTheme}
                            />
                        }
                        label={
                            <Box>
                                <Typography variant="body1">
                                    Dark Mode
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Switch between light and dark themes
                                </Typography>
                            </Box>
                        }
                    />
                </FormGroup>
            </Paper>

            {/* Language Settings */}
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Language Preferences
                </Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="language-select-label">Language</InputLabel>
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={i18n.language}
                        label="Language"
                        onChange={(e) => handleLanguageChange(e.target.value)}
                    >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <MenuItem key={lang.code} value={lang.code}>
                                {lang.nativeName} ({lang.name})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Current language: <strong>{i18n.language.toUpperCase()}</strong>
                </Typography>
            </Paper>

            {/* Notification Settings */}
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Notifications
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.notifications}
                                onChange={(e) => updateSetting('notifications', e.target.checked)}
                            />
                        }
                        label={
                            <Box>
                                <Typography variant="body1">
                                    Enable Notifications
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Receive notifications about important updates
                                </Typography>
                            </Box>
                        }
                    />
                    <Divider sx={{ my: 2 }} />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.emailAlerts}
                                onChange={(e) => updateSetting('emailAlerts', e.target.checked)}
                                disabled={!settings.notifications}
                            />
                        }
                        label={
                            <Box>
                                <Typography variant="body1">
                                    Email Alerts
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Get notified via email
                                </Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.soundEnabled}
                                onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                                disabled={!settings.notifications}
                            />
                        }
                        label={
                            <Box>
                                <Typography variant="body1">
                                    Sound Notifications
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Play sound for notifications
                                </Typography>
                            </Box>
                        }
                    />
                </FormGroup>
            </Paper>

            {/* General Settings */}
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    General
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.autoSave}
                                onChange={(e) => updateSetting('autoSave', e.target.checked)}
                            />
                        }
                        label={
                            <Box>
                                <Typography variant="body1">
                                    Auto-save
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Automatically save your changes
                                </Typography>
                            </Box>
                        }
                    />
                </FormGroup>
            </Paper>

            {/* Debug Info */}
            <Paper sx={{ p: 3, mt: 3, bgcolor: 'action.hover' }}>
                <Typography variant="h6" gutterBottom>
                    Current Configuration
                </Typography>
                <Box component="pre" sx={{ fontSize: '0.875rem', overflow: 'auto', m: 0 }}>
                    {JSON.stringify(
                        {
                            theme: mode,
                            language: i18n.language,
                            settings: settings,
                        },
                        null,
                        2
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default Settings;
