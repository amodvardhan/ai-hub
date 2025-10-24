/**
 * Architecture Overview Section
 */
import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Card, Alert, Chip } from '@components/wrappers';
import { useTheme } from '@mui/material/styles';

export const OverviewSection: React.FC = () => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Architecture Overview
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                This application follows enterprise-grade architecture patterns with type safety,
                scalability, and maintainability as core principles.
            </Alert>

            <Card title="High-Level Architecture" sx={{ mb: 3 }}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        overflow: 'auto',
                    }}
                >
                    <pre style={{ margin: 0 }}>
                        {`┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │           React Components                         │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐        │ │
│  │  │  Pages   │  │ Layouts  │  │ Wrappers │        │ │
│  │  └──────────┘  └──────────┘  └──────────┘        │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│              STATE MANAGEMENT LAYER                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │  React Query │ Zustand │ Context API │ Hooks      │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│              BUSINESS LOGIC LAYER                        │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Custom Hooks │ Services │ Utilities              │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│              DATA ACCESS LAYER                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │      Axios Instance → Interceptors → Backend      │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘`}
                    </pre>
                </Box>
            </Card>

            <Card title="Key Features" sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Type-Safe Architecture</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Feature-Based Organization</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Material-UI Wrappers</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Multilingual Support</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">React Query Integration</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Protected Routing</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Theme Management</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip label="✓" color="success" size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Error Boundaries</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            <Card title="Architecture Principles">
                <List>
                    <ListItem>
                        <ListItemText
                            primary="1. Separation of Concerns"
                            secondary="Each layer has a distinct responsibility"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="2. Single Responsibility"
                            secondary="Components and functions have one clear purpose"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="3. DRY (Don't Repeat Yourself)"
                            secondary="Reusable components and utilities throughout"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="4. Type Safety"
                            secondary="Strict TypeScript enforcement across the codebase"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="5. Feature-Based Organization"
                            secondary="Code organized by business features, not file types"
                        />
                    </ListItem>
                </List>
            </Card>
        </Box>
    );
};
