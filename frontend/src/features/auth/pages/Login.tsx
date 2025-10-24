/**
 * Login page component
 * Supports local, mock, and Azure AD authentication
 */
import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';
import { Button, TextField, Alert } from '@components/wrappers';
import { useAuth } from '../hooks/useAuth';
import { authConfig, AuthProvider } from '@core/config/auth.config';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
    const { login, loginWithAzureAD, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
    const useMockAzureAD = authConfig.useMockAzureAD;

    console.log('🔍 Auth Config:', {
        provider: authConfig.provider,
        envProvider: import.meta.env.VITE_AUTH_PROVIDER,
        isAzureAD: authConfig.provider === AuthProvider.AZURE_AD,
        useMockAzureAD: authConfig.useMockAzureAD,
    });


    const handleLocalLogin = async (values: any) => {
        try {
            setError('');
            await login(values);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    const handleAzureLogin = async () => {
        try {
            setError('');
            await loginWithAzureAD();
        } catch (err: any) {
            setError(err.message || 'Azure AD login failed');
        }
    };

    // Show Azure AD login if provider is azure-ad
    const showAzureADLogin = authConfig.provider === AuthProvider.AZURE_AD;

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" paragraph>
                        {showAzureADLogin
                            ? useMockAzureAD
                                ? 'Sign in with Mock Microsoft Account'
                                : 'Sign in with your Microsoft account'
                            : useMockAuth
                                ? 'Sign in with demo credentials'
                                : 'Sign in to your account'}
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Azure AD Login (Real or Mock) */}
                    {showAzureADLogin ? (
                        <Box>
                            {useMockAzureAD && (
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    <Typography variant="caption" component="div">
                                        <strong>Mock Azure AD Mode</strong>
                                    </Typography>
                                    <Typography variant="caption">
                                        This will simulate Azure AD login without requiring actual credentials.
                                    </Typography>
                                </Alert>
                            )}
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<MicrosoftIcon />}
                                onClick={handleAzureLogin}
                                loading={isLoading}
                                size="large"
                                sx={{
                                    bgcolor: '#0078d4',
                                    '&:hover': {
                                        bgcolor: '#106ebe',
                                    },
                                }}
                            >
                                {useMockAzureAD ? 'Sign in with Mock Microsoft' : 'Sign in with Microsoft'}
                            </Button>
                        </Box>
                    ) : (
                        /* Local/Mock Login Form */
                        <Box>
                            {useMockAuth && (
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    <Typography variant="caption" component="div">
                                        <strong>Demo Accounts:</strong>
                                    </Typography>
                                    <Typography variant="caption" component="div">
                                        Admin: admin@example.com / admin123
                                    </Typography>
                                    <Typography variant="caption" component="div">
                                        User: user@example.com / user123
                                    </Typography>
                                    <Typography variant="caption" component="div" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                        Or use any email with password (min 3 chars)
                                    </Typography>
                                </Alert>
                            )}

                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleLocalLogin}
                            >
                                {({ values, errors, touched, handleChange, handleBlur }) => (
                                    <Form>
                                        <TextField
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            sx={{ mb: 3 }}
                                        />
                                        <Button variant="primary" type="submit" fullWidth loading={isLoading}>
                                            Sign In
                                        </Button>
                                    </Form>
                                )}
                            </Formik>

                            <Divider sx={{ my: 3 }}>OR</Divider>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}
                                    <Button variant="text" onClick={() => navigate('/register')}>
                                        Register
                                    </Button>
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
