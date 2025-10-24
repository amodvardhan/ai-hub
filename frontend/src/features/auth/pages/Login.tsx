/**
 * Login page component with enhanced validation
 * Provides user authentication interface
 */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Typography,
    Link,
    Paper,
    Grid,
    Container,
    Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@components/wrappers';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { validateEmail } from '@utils/validators';

/**
 * Validation schema for login form
 */
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .test('valid-email', 'Invalid email format', (value) => {
            return value ? validateEmail(value) : false;
        }),
    password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at least 3 characters'),
});

/**
 * Login page component
 * @returns JSX Element
 */
const Login: React.FC = () => {
    const { t } = useTranslation('common');
    const { login, isLoading } = useAuth();

    /**
     * Formik form configuration
     */
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            await login(values);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                    Sign in to continue
                </Typography>

                <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="caption">
                        <strong>Demo Mode:</strong> Use any email and password to login
                    </Typography>
                </Alert>

                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="primary"
                        loading={isLoading}
                        disabled={!formik.isValid || isLoading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('actions.submit')}
                    </Button>

                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
