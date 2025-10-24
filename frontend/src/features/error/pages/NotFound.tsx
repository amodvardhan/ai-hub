/**
 * Not Found page component
 * Displayed for invalid routes
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import { Button } from '@components/wrappers';
import SearchOffIcon from '@mui/icons-material/SearchOff';

/**
 * Not Found page component
 * @returns JSX Element
 */
const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '70vh',
                    textAlign: 'center',
                    gap: 2,
                }}
            >
                <SearchOffIcon color="action" sx={{ fontSize: 80 }} />
                <Typography variant="h3" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    The page you're looking for doesn't exist.
                </Typography>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Go Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
