/**
 * Unauthorized page component
 * Displayed when user lacks required permissions
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import { Button } from '@components/wrappers';
import BlockIcon from '@mui/icons-material/Block';

/**
 * Unauthorized page component
 * @returns JSX Element
 */
const Unauthorized: React.FC = () => {
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
                <BlockIcon color="error" sx={{ fontSize: 80 }} />
                <Typography variant="h3" component="h1" gutterBottom>
                    403
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Unauthorized Access
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    You don't have permission to access this resource.
                </Typography>
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                </Button>
            </Box>
        </Container>
    );
};

export default Unauthorized;
