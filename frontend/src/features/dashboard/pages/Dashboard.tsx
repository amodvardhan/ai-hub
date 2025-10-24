/**
 * Dashboard page component with granular error boundaries
 */
import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@store/auth.store';
import { ComponentErrorBoundary } from '@components/common';
import { formatDateTime } from '@utils/helpers';

/**
 * Dashboard Stats Component (can fail independently)
 */
const DashboardStats: React.FC = () => {
    // Simulate potential error
    // throw new Error('Stats component failed!');

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">Total Projects</Typography>
                        <Typography variant="h3" color="primary">12</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">Active Tasks</Typography>
                        <Typography variant="h3" color="warning.main">24</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">Completed</Typography>
                        <Typography variant="h3" color="success.main">156</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

/**
 * User Info Component (can fail independently)
 */
const UserInfoCard: React.FC = () => {
    const { user } = useAuthStore();

    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h6" gutterBottom>User Information</Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <strong>Roles:</strong> {user?.roles.join(', ')}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

/**
 * Recent Activity Component (can fail independently)
 */
const RecentActivityCard: React.FC = () => {
    // Uncomment to test error handling
    // throw new Error('Recent activity failed to load!');

    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <Typography variant="body2" color="text.secondary">
                    No recent activity to display
                </Typography>
            </CardContent>
        </Card>
    );
};

/**
 * Dashboard page component
 * Each section wrapped in its own error boundary
 */
const Dashboard: React.FC = () => {
    const { t } = useTranslation('common');
    const { user } = useAuthStore();
    const currentDate = formatDateTime(new Date());

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Header - Critical, no error boundary */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1">{t('navigation.dashboard')}</Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome back, {user?.name}!
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Last updated: {currentDate}
                </Typography>
            </Box>

            {/* Stats Section - Isolated error boundary */}
            <ComponentErrorBoundary componentName="Dashboard Stats">
                <Box sx={{ mb: 3 }}>
                    <DashboardStats />
                </Box>
            </ComponentErrorBoundary>

            {/* User Info Section - Isolated error boundary */}
            <ComponentErrorBoundary componentName="User Information">
                <Box sx={{ mb: 3 }}>
                    <UserInfoCard />
                </Box>
            </ComponentErrorBoundary>

            {/* Recent Activity Section - Isolated error boundary */}
            <ComponentErrorBoundary componentName="Recent Activity">
                <Box sx={{ mb: 3 }}>
                    <RecentActivityCard />
                </Box>
            </ComponentErrorBoundary>
        </Container>
    );
};

export default Dashboard;
