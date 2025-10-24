/**
 * CodeBlock component with copy functionality
 * Displays code snippets with theme-aware styling and copy button
 */
import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface CodeBlockProps {
    code: string;
    language?: string;
    showLanguage?: boolean;
    enableCopy?: boolean;
}

/**
 * CodeBlock component
 * @param props - Component props
 * @returns JSX Element
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language = 'typescript',
    showLanguage = true,
    enableCopy = true,
}) => {
    const theme = useTheme();
    const [copied, setCopied] = useState(false);

    /**
     * Handles copying code to clipboard
     */
    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <Box
            sx={{
                mt: 2,
                position: 'relative',
            }}
        >
            {(showLanguage || enableCopy) && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 0.5
                    }}
                >
                    {showLanguage && (
                        <Chip
                            label={language.toUpperCase()}
                            size="small"
                            sx={{
                                fontSize: '0.65rem',
                                height: 20,
                                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            }}
                        />
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    {enableCopy && (
                        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
                            <IconButton
                                size="small"
                                onClick={handleCopy}
                                sx={{
                                    color: copied ? 'success.main' : 'text.secondary',
                                }}
                            >
                                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            )}
            <Box
                sx={{
                    p: 2,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    overflow: 'auto',
                    position: 'relative',
                    '&:hover': enableCopy ? {
                        borderColor: theme.palette.primary.main,
                    } : {},
                }}
            >
                <Typography
                    variant="caption"
                    component="pre"
                    sx={{
                        m: 0,
                        fontFamily: '"Fira Code", "Courier New", Courier, monospace',
                        fontSize: '0.875rem',
                        color: theme.palette.text.primary,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: 1.6,
                    }}
                >
                    {code}
                </Typography>
            </Box>
        </Box>
    );
};

export default CodeBlock;
