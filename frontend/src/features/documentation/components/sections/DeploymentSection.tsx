/**
 * Deployment Section - Updated with Auth Modes
 */
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Card, Alert, Chip } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const DeploymentSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Deployment
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
            The application supports multiple deployment modes with configurable authentication.
            Choose the right environment based on your authentication requirements.
        </Alert>

        <Card title="Available Build Modes" sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Chip label="Local Auth" status="info" />
                <Chip label="Azure AD" status="success" />
                <Chip label="Mock Mode" status="warning" />
            </Box>
            <List>
                <ListItem>
                    <ListItemText
                        primary="1. Development (Local Auth with Mock)"
                        secondary="npm run dev - Uses mock authentication, no backend needed"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="2. Development (Azure AD with Mock)"
                        secondary="npm run dev:azuread - Shows Microsoft button, mock Azure AD flow"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="3. Production (Local Auth)"
                        secondary="npm run build - Real backend authentication"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary="4. Production (Azure AD)"
                        secondary="npm run build:azuread - Real Azure AD integration"
                    />
                </ListItem>
            </List>
        </Card>

        <Card title="Pre-Deployment Checklist" sx={{ mb: 3 }}>
            <CodeBlock
                language="bash"
                code={`# Run all quality checks
npm run check

# This runs:
# - Type checking (tsc)
# - Linting (eslint)
# - Format checking (prettier)

# If all pass, proceed with build`}
            />
        </Card>

        <Card title="Environment Configuration" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
                Development - Local Auth (.env.development)
            </Typography>
            <CodeBlock
                language="bash"
                code={`VITE_AUTH_PROVIDER=local
VITE_USE_MOCK_AUTH=true
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Enterprise App (Dev)
VITE_APP_VERSION=1.0.0
VITE_ENABLE_RETRY=true`}
            />

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Development - Azure AD Mock (.env.azuread)
            </Typography>
            <CodeBlock
                language="bash"
                code={`VITE_AUTH_PROVIDER=azure-ad
VITE_USE_MOCK_AZURE_AD=true
VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Enterprise App (Mock Azure AD)
VITE_APP_VERSION=1.0.0`}
            />

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Production - Local Auth (.env.production)
            </Typography>
            <CodeBlock
                language="bash"
                code={`VITE_AUTH_PROVIDER=local
VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=https://api.yourcompany.com/api
VITE_APP_NAME=Enterprise Application
VITE_APP_VERSION=1.0.0
VITE_ENABLE_RETRY=true`}
            />

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Production - Azure AD (.env.production.azuread)
            </Typography>
            <CodeBlock
                language="bash"
                code={`VITE_AUTH_PROVIDER=azure-ad
VITE_USE_MOCK_AZURE_AD=false
VITE_USE_MOCK_AUTH=false

# Azure AD Configuration
VITE_AZURE_CLIENT_ID=your-production-client-id
VITE_AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
VITE_AZURE_REDIRECT_URI=https://app.yourcompany.com
VITE_AZURE_SCOPES=User.Read,openid,profile,email

# API Configuration
VITE_API_BASE_URL=https://api.yourcompany.com/api
VITE_APP_NAME=Enterprise Application
VITE_APP_VERSION=1.0.0`}
            />
        </Card>

        <Card title="Build Commands" sx={{ mb: 3 }}>
            <CodeBlock
                language="bash"
                code={`# Build with Local Authentication
npm run build
# Uses .env.production
# Output: dist/ folder

# Build with Azure AD Authentication
npm run build:azuread
# Uses .env.production.azuread
# Output: dist/ folder

# Preview build locally
npm run preview              # Preview local auth build
npm run preview:azuread      # Preview Azure AD build`}
            />
        </Card>

        <Card title="Deploy to Vercel" sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
                <strong>Step 1: Install Vercel CLI</strong>
            </Typography>
            <CodeBlock
                language="bash"
                code={`npm install -g vercel`}
            />

            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Step 2: Deploy (Choose authentication mode)</strong>
            </Typography>
            <CodeBlock
                language="bash"
                code={`# Deploy with Local Auth
vercel --prod

# Deploy with Azure AD
vercel --prod --build-env VITE_AUTH_PROVIDER=azure-ad \\
  --build-env VITE_AZURE_CLIENT_ID=your-client-id \\
  --build-env VITE_AZURE_AUTHORITY=your-authority \\
  --build-env VITE_AZURE_REDIRECT_URI=https://your-app.vercel.app`}
            />

            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Step 3: Configure Environment Variables in Vercel Dashboard</strong>
            </Typography>
            <Typography variant="caption" display="block">
                1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
                <br />
                2. Add all VITE_* variables from your .env.production file
                <br />
                3. For Azure AD, add Azure configuration variables
                <br />
                4. Redeploy the project
            </Typography>
        </Card>

        <Card title="Deploy with Docker" sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
                <strong>Dockerfile (Multi-stage build)</strong>
            </Typography>
            <CodeBlock
                language="dockerfile"
                code={`# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build argument for auth mode
ARG AUTH_MODE=local
ENV VITE_AUTH_PROVIDER=\${AUTH_MODE}

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]`}
            />

            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>nginx.conf</strong>
            </Typography>
            <CodeBlock
                language="nginx"
                code={`server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}`}
            />

            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Build and Run Docker Container</strong>
            </Typography>
            <CodeBlock
                language="bash"
                code={`# Build for Local Auth
docker build -t enterprise-app:latest .

# Build for Azure AD
docker build --build-arg AUTH_MODE=azure-ad -t enterprise-app:azuread .

# Run container
docker run -p 8080:80 enterprise-app:latest

# Run with environment variables
docker run -p 8080:80 \\
  -e VITE_API_BASE_URL=https://api.yourcompany.com/api \\
  enterprise-app:latest`}
            />
        </Card>

        <Card title="Deploy to AWS S3 + CloudFront" sx={{ mb: 3 }}>
            <CodeBlock
                language="bash"
                code={`# Build the application
npm run build

# Install AWS CLI (if not already installed)
# brew install awscli  # macOS
# pip install awscli   # Python

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-app-bucket

# Upload build files
aws s3 sync dist/ s3://your-app-bucket --delete

# Make files public
aws s3 website s3://your-app-bucket --index-document index.html --error-document index.html

# Create CloudFront distribution (CDN)
# Configure in AWS Console:
# - Origin: your-app-bucket.s3.amazonaws.com
# - Default Root Object: index.html
# - Error Pages: 404 → /index.html (for SPA routing)`}
            />
        </Card>

        <Card title="Deploy to Netlify" sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
                <strong>netlify.toml (Configuration file)</strong>
            </Typography>
            <CodeBlock
                language="toml"
                code={`[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

# SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"`}
            />

            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Deploy Commands</strong>
            </Typography>
            <CodeBlock
                language="bash"
                code={`# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod

# Set environment variables via CLI
netlify env:set VITE_API_BASE_URL "https://api.yourcompany.com/api"
netlify env:set VITE_AUTH_PROVIDER "azure-ad"`}
            />
        </Card>

        <Card title="Post-Deployment Checklist">
            <Typography variant="subtitle2" gutterBottom>
                Critical Checks
            </Typography>
            <Typography variant="body2" component="div">
                ✓ Verify environment variables are set correctly
                <br />
                ✓ Test authentication flow (login/logout)
                <br />
                ✓ Check API endpoints are accessible
                <br />
                ✓ Verify Azure AD redirect URIs (if using Azure AD)
                <br />
                ✓ Test all critical user flows
                <br />
                ✓ Check error handling works
                <br />
                <br />
                <strong>Browser Testing</strong>
                <br />
                ✓ Test on Chrome, Firefox, Safari, Edge
                <br />
                ✓ Check mobile responsiveness
                <br />
                ✓ Test on iOS and Android devices
                <br />
                <br />
                <strong>Features</strong>
                <br />
                ✓ Test language switching (en, es, fr)
                <br />
                ✓ Verify theme switching (light/dark)
                <br />
                ✓ Check all routes are accessible
                <br />
                ✓ Test form validation
                <br />
                <br />
                <strong>Performance</strong>
                <br />
                ✓ Run Lighthouse audit
                <br />
                ✓ Check bundle size
                <br />
                ✓ Monitor error logs
                <br />
                ✓ Check load times
            </Typography>
        </Card>

        <Card title="Monitoring and Logging" sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
                <strong>Recommended Tools:</strong>
            </Typography>
            <Typography variant="body2">
                • <strong>Sentry</strong> - Error tracking and monitoring
                <br />
                • <strong>LogRocket</strong> - Session replay and debugging
                <br />
                • <strong>Google Analytics</strong> - User analytics
                <br />
                • <strong>Datadog</strong> - Application performance monitoring
                <br />• <strong>CloudWatch</strong> - AWS monitoring (if using AWS)
            </Typography>
        </Card>
    </Box>
);
