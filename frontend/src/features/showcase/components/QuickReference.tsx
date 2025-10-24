/**
 * Quick Reference Card Component
 * Provides quick tips and best practices for developers
 */
import React from 'react';
import { Card, Alert } from '@components/wrappers';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Quick Reference component
 * @returns JSX Element
 */
export const QuickReference: React.FC = () => {
    const theme = useTheme();

    return (
        <Card title="🚀 Developer Quick Reference" subtitle="Best Practices & Tips">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="info">
                    <Typography variant="subtitle2" gutterBottom>
                        📦 Import Pattern
                    </Typography>
                    <Box
                        sx={{
                            bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.800',
                            color: theme.palette.mode === 'dark' ? 'grey.100' : 'white',
                            p: 1,
                            borderRadius: 1,
                            fontFamily: 'monospace',
                        }}
                    >
                        <Typography variant="caption" component="pre" sx={{ m: 0 }}>
                            {`import { Button, TextField, Select } from '@components/wrappers';`}
                        </Typography>
                    </Box>
                </Alert>

                <Alert severity="success">
                    <Typography variant="subtitle2" gutterBottom>
                        ✅ State Management Best Practices
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemText
                                primary="Always use TypeScript types for state"
                                secondary={
                                    <Typography
                                        variant="caption"
                                        component="code"
                                        sx={{
                                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                                            p: 0.5,
                                            borderRadius: 0.5,
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        const [value, setValue] = useState&lt;string&gt;('');
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Use proper event handler types"
                                secondary={
                                    <Typography
                                        variant="caption"
                                        component="code"
                                        sx={{
                                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                                            p: 0.5,
                                            borderRadius: 0.5,
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        onChange: (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Alert>

                <Alert severity="warning">
                    <Typography variant="subtitle2" gutterBottom>
                        ⚡ Loading & Async Operations
                    </Typography>
                    <Typography variant="body2">
                        • Use the built-in <Typography component="code" sx={{ bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200', px: 0.5, borderRadius: 0.5 }}>loading</Typography> prop for async operations<br />
                        • Show loading indicators during data fetching<br />
                        • Disable interactive elements while loading
                    </Typography>
                </Alert>

                <Alert severity="error">
                    <Typography variant="subtitle2" gutterBottom>
                        🛡️ Error Handling & Validation
                    </Typography>
                    <Typography variant="body2">
                        • Always provide <Typography component="code" sx={{ bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200', px: 0.5, borderRadius: 0.5 }}>error</Typography> and <Typography component="code" sx={{ bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200', px: 0.5, borderRadius: 0.5 }}>helperText</Typography> props for form validation<br />
                        • Use Formik + Yup for complex form validation<br />
                        • Display user-friendly error messages
                    </Typography>
                </Alert>

                <Box
                    sx={{
                        p: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom>
                        📖 Quick Tips
                    </Typography>
                    <Typography variant="caption" component="div">
                        • All wrappers are fully typed with TypeScript<br />
                        • Components support all Material-UI props via spread<br />
                        • Use wrapper components instead of direct MUI imports<br />
                        • Check the code examples below each component<br />
                        • Refer to ARCHITECTURE.md for detailed documentation
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default QuickReference;
