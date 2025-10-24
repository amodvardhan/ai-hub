/**
 * Technology Stack Section
 */
import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Card, Chip } from '@components/wrappers';

export const TechStackSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Technology Stack
        </Typography>

        <Card title="Core Technologies" sx={{ mb: 3 }}>
            <Grid container spacing={2}>
                {[
                    { title: 'Build Tool', tech: 'Vite 5.4.8', desc: 'Fast dev server and build tool' },
                    { title: 'Framework', tech: 'React 18.3.1', desc: 'UI library' },
                    { title: 'Language', tech: 'TypeScript 5.6.2', desc: 'Type-safe JavaScript' },
                    { title: 'UI Library', tech: 'Material-UI 6.1.3', desc: 'Component library' },
                ].map((item) => (
                    <Grid item xs={12} md={6} key={item.title}>
                        <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                {item.title}
                            </Typography>
                            <Chip label={item.tech} color="primary" size="small" sx={{ mr: 1 }} />
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                {item.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Card>

        <Card title="State & Data Management" sx={{ mb: 3 }}>
            <List>
                <ListItem>
                    <ListItemText
                        primary="Zustand 5.0.0"
                        secondary="Lightweight state management for auth and global client state"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="React Query 5.59.8"
                        secondary="Server state management with caching and synchronization"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="Axios 1.7.7"
                        secondary="Promise-based HTTP client for API requests"
                    />
                </ListItem>
            </List>
        </Card>

        <Card title="Development Tools">
            <List>
                {[
                    { name: 'ESLint 9.12.0', desc: 'Code quality and consistency' },
                    { name: 'Prettier 3.3.3', desc: 'Code formatting' },
                    { name: 'Formik 2.4.6 + Yup 1.4.0', desc: 'Form management and validation' },
                    { name: 'react-i18next 15.0.2', desc: 'Internationalization' },
                ].map((tool, index) => (
                    <React.Fragment key={tool.name}>
                        {index > 0 && <Divider />}
                        <ListItem>
                            <ListItemText primary={tool.name} secondary={tool.desc} />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </Card>
    </Box>
);
