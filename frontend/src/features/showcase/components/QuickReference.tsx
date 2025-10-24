/**
 * Quick Reference Card Component
 * Provides quick tips and best practices for developers
 */
import React from 'react';
import { Card, Alert } from '@components/wrappers';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

/**
 * Quick Reference component
 * @returns JSX Element
 */
export const QuickReference: React.FC = () => {
    return (
        <Card title="🚀 Developer Quick Reference" subtitle="Best Practices & Tips">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="info">
                    <Typography variant="subtitle2" gutterBottom>
                        📦 Import Pattern
                    </Typography>
                    <Typography variant="caption" component="pre" sx={{ bgcolor: 'grey.900', color: 'white', p: 1, borderRadius: 1 }}>
                        {`import { Button, TextField, Select } from '@components/wrappers';`}
                    </Typography>
                </Alert>

                <Alert severity="success">
                    <Typography variant="subtitle2" gutterBottom>
                        ✅ State Management Best Practices
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemText
                                primary="Always use TypeScript types for state"
                                secondary="const [value, setValue] = useState<string>('');"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Use proper event handler types"
                                secondary="onChange: (e: React.ChangeEvent<HTMLInputElement>) => void"
                            />
                        </ListItem>
                    </List>
                </Alert>

                <Alert severity="warning">
                    <Typography variant="subtitle2" gutterBottom>
                        ⚡ Loading & Async Operations
                    </Typography>
                    <Typography variant="body2">
                        • Use the built-in <code>loading</code> prop for async operations<br />
                        • Show loading indicators during data fetching<br />
                        • Disable interactive elements while loading
                    </Typography>
                </Alert>

                <Alert severity="error">
                    <Typography variant="subtitle2" gutterBottom>
                        🛡️ Error Handling & Validation
                    </Typography>
                    <Typography variant="body2">
                        • Always provide <code>error</code> and <code>helperText</code> props for form validation<br />
                        • Use Formik + Yup for complex form validation<br />
                        • Display user-friendly error messages
                    </Typography>
                </Alert>

                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
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
