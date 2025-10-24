/**
 * Deployment Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const DeploymentSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Deployment
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
            The application can be deployed to various platforms. Below are recommended deployment strategies.
        </Alert>

        <Card title="Production Build" sx={{ mb: 3 }}>
            <CodeBlock
                language="bash"
                code={`# Type check
npm run type-check

# Lint code
npm run lint

# Build for production
npm run build

# Output: dist/ folder`}
            />
        </Card>

        <Card title="Environment Configuration" sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
                <strong>Development (.env.development)</strong>
            </Typography>
            <CodeBlock
                language="bash"
                code={`VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Enterprise App (Dev)`}
            />
            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Production (.env.production)</strong>
            </Typography>
            <CodeBlock
                language="bash"
                code={`VITE_API_BASE_URL=https://api.production.com/api
VITE_APP_NAME=Enterprise Application`}
            />
        </Card>

        <Card title="Deploy to Vercel" sx={{ mb: 3 }}>
            <CodeBlock
                language="bash"
                code={`# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod`}
            />
        </Card>

        <Card title="Deploy with Docker" sx={{ mb: 3 }}>
            <CodeBlock
                language="dockerfile"
                code={`# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            />
        </Card>

        <Card title="Post-Deployment Checklist">
            <Typography variant="body2">
                ✓ Verify environment variables are set correctly<br />
                ✓ Test all critical user flows<br />
                ✓ Check API endpoints are accessible<br />
                ✓ Verify authentication works<br />
                ✓ Test on multiple browsers<br />
                ✓ Check mobile responsiveness<br />
                ✓ Monitor error logs<br />
                ✓ Test language switching<br />
                ✓ Verify theme switching<br />
                ✓ Check performance metrics
            </Typography>
        </Card>
    </Box>
);
