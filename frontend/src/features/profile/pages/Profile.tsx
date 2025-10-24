/**
 * Profile page component
 * User profile management interface
 */
import React from 'react';
import { Container, Box, Typography, Paper, Grid, Avatar, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@store/auth.store';
import { TextField } from '@components/wrappers';
import { getInitials, capitalizeFirstLetter } from '@utils/helpers';

/**
 * Profile page component
 * @returns JSX Element
 */
const Profile: React.FC = () => {
    const { t } = useTranslation('common');
    const { user } = useAuthStore();

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('navigation.profile')}
            </Typography>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 80,
                            height: 80,
                            fontSize: '2rem',
                        }}
                    >
                        {getInitials(user?.name || '')}
                    </Avatar>
                    <Box>
                        <Typography variant="h5">{user?.name}</Typography>
                        <Box sx={{ mt: 1 }}>
                            {user?.roles.map((role) => (
                                <Chip
                                    key={role}
                                    label={capitalizeFirstLetter(role)}
                                    color="primary"
                                    size="small"
                                    sx={{ mr: 1 }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={user?.name || ''}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            value={user?.email || ''}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="User ID"
                            value={user?.id || ''}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Roles"
                            value={user?.roles.map(capitalizeFirstLetter).join(', ') || ''}
                            disabled
                            helperText="Your assigned roles in the system"
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Account Status
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Chip label="Active" color="success" />
                    <Chip label="Verified" color="info" sx={{ ml: 1 }} />
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
