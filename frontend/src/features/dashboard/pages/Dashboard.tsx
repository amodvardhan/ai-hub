/**
 * Dashboard page component
 * Main dashboard view for authenticated users
 */
import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@store/auth.store';
import { formatDateTime, getInitials } from '@utils/helpers';

/**
 * Dashboard page component
 * @returns JSX Element
 */
const Dashboard: React.FC = () => {
    const { t } = useTranslation('common');
    const { user } = useAuthStore();
    const currentDate = formatDateTime(new Date());

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                        {getInitials(user?.name || '')}
                    </Avatar>
                    <Box>
                        <Typography variant="h4" component="h1">
                            {t('navigation.dashboard')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Welcome back, {user?.name}!
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                    Last updated: {currentDate}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Projects
                            </Typography>
                            <Typography variant="h3" color="primary.main">
                                12
                            </Typography>
                            <Chip label="+2 this month" color="success" size="small" sx={{ mt: 1 }} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Active Tasks
                            </Typography>
                            <Typography variant="h3" color="warning.main">
                                24
                            </Typography>
                            <Chip label="5 due today" color="warning" size="small" sx={{ mt: 1 }} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Completed
                            </Typography>
                            <Typography variant="h3" color="success.main">
                                156
                            </Typography>
                            <Chip label="94% completion" color="success" size="small" sx={{ mt: 1 }} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                User Information
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Email:</strong> {user?.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    <strong>Roles:</strong> {user?.roles.join(', ')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    <strong>User ID:</strong> {user?.id}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Activity
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                No recent activity to display
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
