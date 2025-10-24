/**
 * Component Library Section
 */
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Card, Alert, Chip } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const ComponentsSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Component Library
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
            All Material-UI components are wrapped for consistency, type safety, and extended functionality.
        </Alert>

        <Card title="Available Wrapper Components" sx={{ mb: 3 }}>
            <Grid container spacing={1}>
                {[
                    'Button', 'TextField', 'Select', 'Checkbox', 'RadioGroup', 'Switch',
                    'Autocomplete', 'DatePicker', 'Dialog', 'Card', 'Chip', 'Alert',
                    'Tabs', 'Table', 'Slider', 'IconButton', 'Badge', 'Tooltip',
                ].map((component) => (
                    <Grid item key={component}>
                        <Chip label={component} color="primary" size="small" />
                    </Grid>
                ))}
            </Grid>
        </Card>

        <Card title="Component Structure" sx={{ mb: 3 }}>
            <CodeBlock
                language="tsx"
                code={`// Component file structure
src/components/wrappers/Button/
├── Button.tsx           # Component implementation
├── Button.types.ts      # TypeScript interfaces
└── index.ts            # Barrel export

// Example: Button wrapper
import { Button as MuiButton, CircularProgress } from '@mui/material';

export const Button: React.FC<CustomButtonProps> = ({
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <MuiButton
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} /> : rest.startIcon}
      {...rest}
    />
  );
};`}
            />
        </Card>

        <Card title="Usage Example">
            <CodeBlock
                language="tsx"
                code={`import { Button, TextField, Select } from '@components/wrappers';

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      <Button 
        variant="primary" 
        loading={loading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
    </>
  );
};`}
            />
        </Card>
    </Box>
);
