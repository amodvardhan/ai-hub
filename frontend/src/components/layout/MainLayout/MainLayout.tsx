/**
 * Main layout component with AppBar, navigation, and user menu
 * Includes logout functionality and language switcher
 */
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Avatar,
    Tooltip,
    ListItemIcon,
    Divider,
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    Language as LanguageIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@store/auth.store';
import { useAuth } from '@features/auth/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '@core/contexts';

/**
 * Main layout component
 * @returns JSX Element
 */
const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { logout } = useAuth();
    const { t, i18n } = useTranslation('common');
    const { mode, toggleTheme } = useThemeContext();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

    /**
     * Opens user menu
     * @param event - Mouse event
     */
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Closes user menu
     */
    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null);
    };

    /**
     * Opens language menu
     * @param event - Mouse event
     */
    const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElLang(event.currentTarget);
    };

    /**
     * Closes language menu
     */
    const handleCloseLangMenu = (): void => {
        setAnchorElLang(null);
    };

    /**
     * Changes application language
     * @param lang - Language code
     */
    const handleLanguageChange = (lang: string): void => {
        i18n.changeLanguage(lang);
        handleCloseLangMenu();
    };

    /**
     * Handles logout action
     */
    const handleLogout = (): void => {
        handleCloseUserMenu();
        logout();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo/Title */}
                        <MenuIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'pointer' }}
                            onClick={() => navigate('/dashboard')}
                        >
                            {t('app.title')}
                        </Typography>

                        {/* Theme Toggle */}
                        <Box sx={{ mr: 1 }}>
                            <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                                <IconButton
                                    onClick={toggleTheme}
                                    sx={{ color: 'white' }}
                                    size="large"
                                >
                                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {/* Language Switcher */}
                        <Box sx={{ mr: 2 }}>
                            <Tooltip title="Change Language">
                                <IconButton
                                    onClick={handleOpenLangMenu}
                                    sx={{ color: 'white' }}
                                    size="large"
                                >
                                    <LanguageIcon />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="language-menu"
                                anchorEl={anchorElLang}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElLang)}
                                onClose={handleCloseLangMenu}
                            >
                                <MenuItem
                                    onClick={() => handleLanguageChange('en')}
                                    selected={i18n.language === 'en'}
                                >
                                    <ListItemIcon>
                                        <LanguageIcon fontSize="small" />
                                    </ListItemIcon>
                                    English
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleLanguageChange('es')}
                                    selected={i18n.language === 'es'}
                                >
                                    <ListItemIcon>
                                        <LanguageIcon fontSize="small" />
                                    </ListItemIcon>
                                    Español
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleLanguageChange('fr')}
                                    selected={i18n.language === 'fr'}
                                >
                                    <ListItemIcon>
                                        <LanguageIcon fontSize="small" />
                                    </ListItemIcon>
                                    Français
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/* User Menu */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem disabled>
                                    <Typography textAlign="center" variant="body2" color="text.secondary">
                                        {user?.email}
                                    </Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/dashboard'); }}>
                                    <ListItemIcon>
                                        <DashboardIcon fontSize="small" />
                                    </ListItemIcon>
                                    {t('navigation.dashboard')}
                                </MenuItem>
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                                    <ListItemIcon>
                                        <AccountCircle fontSize="small" />
                                    </ListItemIcon>
                                    {t('navigation.profile')}
                                </MenuItem>
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/settings'); }}>
                                    <ListItemIcon>
                                        <SettingsIcon fontSize="small" />
                                    </ListItemIcon>
                                    {t('navigation.settings')}
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    {t('navigation.logout')}
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
