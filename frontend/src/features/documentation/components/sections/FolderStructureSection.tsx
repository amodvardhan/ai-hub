/**
 * Folder Structure Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const FolderStructureSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Folder Structure
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
            The application follows a feature-based folder structure for better scalability and
            maintainability.
        </Alert>

        <Card title="Complete Directory Tree" sx={{ mb: 3 }}>
            <CodeBlock
                language="plaintext"
                code={`project-root/
├── public/                          # Static assets
├── src/
│   ├── core/                        # Core configuration
│   │   ├── config/
│   │   │   ├── axios.config.ts
│   │   │   ├── react-query.config.ts
│   │   │   ├── theme.config.ts
│   │   │   └── index.ts
│   │   ├── contexts/
│   │   │   ├── ThemeContext.tsx
│   │   │   └── index.ts
│   │   ├── i18n/
│   │   │   ├── locales/
│   │   │   │   ├── en/
│   │   │   │   ├── es/
│   │   │   │   └── fr/
│   │   │   └── i18n.config.ts
│   │   ├── types/
│   │   └── constants/
│   ├── components/
│   │   ├── wrappers/                # 18 MUI wrappers
│   │   ├── common/
│   │   └── layout/
│   ├── features/                    # Feature modules
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── settings/
│   │   ├── showcase/
│   │   └── documentation/
│   ├── hooks/
│   ├── services/
│   ├── routes/
│   ├── store/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── tsconfig.json
├── vite.config.ts
└── package.json`}
            />
        </Card>

        <Card title="Folder Organization Principles">
            <Typography variant="subtitle2" gutterBottom>
                Core (`src/core/`)
            </Typography>
            <Typography variant="body2" paragraph>
                Contains application-wide configurations, constants, types, and contexts. Nothing in this
                folder should depend on features.
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
                Components (`src/components/`)
            </Typography>
            <Typography variant="body2" paragraph>
                • <strong>wrappers/</strong>: Material-UI component wrappers
                <br />
                • <strong>common/</strong>: Shared components
                <br />• <strong>layout/</strong>: Page layouts
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
                Features (`src/features/`)
            </Typography>
            <Typography variant="body2" paragraph>
                Self-contained feature modules with components, hooks, services, types, and pages.
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
                Services (`src/services/`)
            </Typography>
            <Typography variant="body2">
                Base service class with CRUD operations, Axios configuration and interceptors.
            </Typography>
        </Card>
    </Box>
);
