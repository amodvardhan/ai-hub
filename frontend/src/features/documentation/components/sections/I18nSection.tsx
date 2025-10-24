/**
 * Internationalization Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const I18nSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Internationalization (i18n)
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
            The application supports multiple languages using react-i18next with automatic language detection.
        </Alert>

        <Card title="Supported Languages" sx={{ mb: 3 }}>
            <Typography variant="body2">
                • English (en) - Default<br />
                • Spanish (es)<br />
                • French (fr)
            </Typography>
        </Card>

        <Card title="Translation File Structure" sx={{ mb: 3 }}>
            <CodeBlock
                language="plaintext"
                code={`src/core/i18n/locales/
├─ en/
│  ├─ common.json       # Common UI labels
│  ├─ validation.json   # Validation messages
│  └─ messages.json     # Success/error messages
├─ es/
│  ├─ common.json
│  ├─ validation.json
│  └─ messages.json
└─ fr/
   ├─ common.json
   ├─ validation.json
   └─ messages.json`}
            />
        </Card>

        <Card title="Usage in Components" sx={{ mb: 3 }}>
            <CodeBlock
                language="tsx"
                code={`import { useTranslation } from 'react-i18next';

const MyComponent: React.FC = () => {
  const { t, i18n } = useTranslation('common');

  // Use translations
  return (
    <>
      <Typography>{t('navigation.dashboard')}</Typography>
      <Button onClick={() => i18n.changeLanguage('es')}>
        Español
      </Button>
    </>
  );
};`}
            />
        </Card>

        <Card title="Adding New Language">
            <Typography variant="body2" paragraph>
                1. Create new folder: <code>src/core/i18n/locales/[language_code]/</code>
            </Typography>
            <Typography variant="body2" paragraph>
                2. Add translation files: <code>common.json</code>, <code>validation.json</code>, <code>messages.json</code>
            </Typography>
            <Typography variant="body2" paragraph>
                3. Import translations in <code>i18n.config.ts</code>
            </Typography>
            <Typography variant="body2" paragraph>
                4. Add to <code>supportedLngs</code> array
            </Typography>
            <Typography variant="body2">
                5. Update language switcher UI
            </Typography>
        </Card>
    </Box>
);
