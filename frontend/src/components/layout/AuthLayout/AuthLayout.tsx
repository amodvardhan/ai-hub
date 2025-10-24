/**
 * Authentication layout component
 * Provides consistent layout for login, register, and other auth pages
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

/**
 * Authentication layout component
 * @returns JSX Element
 */
const AuthLayout: React.FC = () => {
    const { t, i18n } = useTranslation('common');
    const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);

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


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            {/* AppBar for Auth Pages */}
            <AppBar position="static" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {t('app.title')}
                        </Typography>

                        {/* Language Switcher */}
                        <Box>
                            <IconButton
                                onClick={handleOpenLangMenu}
                                sx={{ color: 'white' }}
                                size="large"
                            >
                                <LanguageIcon />
                            </IconButton>
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
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Outlet />
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    bgcolor: 'background.paper',
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} {t('app.title')}. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default AuthLayout;
