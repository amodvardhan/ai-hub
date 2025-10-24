/**
 * Best Practices Section
 */
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const BestPracticesSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Best Practices
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
            Follow these best practices to maintain code quality, consistency, and scalability.
        </Alert>

        <Card title="Naming Conventions" sx={{ mb: 3 }}>
            <List>
                <ListItem>
                    <ListItemText
                        primary="Components: PascalCase"
                        secondary="UserProfile.tsx, ProductCard.tsx"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="Hooks: camelCase with 'use' prefix"
                        secondary="useAuth.ts, useProducts.ts"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="Services: camelCase with 'Service' suffix"
                        secondary="authService.ts, productService.ts"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="Types/Interfaces: PascalCase"
                        secondary="UserProfile, ApiResponse<T>"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="Constants: UPPER_SNAKE_CASE"
                        secondary="API_BASE_URL, MAX_FILE_SIZE"
                    />
                </ListItem>
            </List>
        </Card>

        <Card title="Component Structure" sx={{ mb: 3 }}>
            <CodeBlock
                language="tsx"
                code={`/**
 * Component description
 */
import React from 'react';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState<Type>(initialValue);

  // 2. Event handlers
  const handleClick = (): void => {
    // Handler logic
  };

  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 4. Render
  return <div>{/* JSX */}</div>;
};

export default Component;`}
            />
        </Card>

        <Card title="TypeScript Best Practices" sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
                • Always define explicit types for props and state<br />
                • Use interfaces for object shapes<br />
                • Avoid using 'any' - use 'unknown' if needed<br />
                • Leverage TypeScript utility types<br />
                • Use strict mode in tsconfig.json
            </Typography>
            <CodeBlock
                language="tsx"
                code={`// ✓ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);

// ✗ Bad
const [user, setUser] = useState<any>(null);`}
            />
        </Card>

        <Card title="Performance Tips" sx={{ mb: 3 }}>
            <Typography variant="body2">
                • Use React.memo for expensive pure components<br />
                • Implement code splitting with React.lazy<br />
                • Memoize expensive calculations with useMemo<br />
                • Use useCallback for event handlers passed to children<br />
                • Optimize images and assets<br />
                • Implement proper loading states<br />
                • Use React Query for data caching
            </Typography>
        </Card>

        <Card title="Security Best Practices">
            <Typography variant="body2">
                • Never commit .env files<br />
                • Validate all user input<br />
                • Sanitize data before sending to API<br />
                • Use HTTPS in production<br />
                • Implement proper authentication<br />
                • Store tokens securely<br />
                • Keep dependencies updated<br />
                • Run npm audit regularly
            </Typography>
        </Card>
    </Box>
);
