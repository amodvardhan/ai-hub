/**
 * Architecture Documentation Page
 * Interactive documentation for the application architecture
 */
import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {
    Architecture as ArchitectureIcon,
    Folder as FolderIcon,
    DataObject as DataObjectIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
    Language as LanguageIcon,
    CloudUpload as CloudUploadIcon,
    BugReport as BugReportIcon,
    Code as CodeIcon,
    Storage as StorageIcon,
    Settings as SettingsIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import {
    OverviewSection,
    FolderStructureSection,
    TechStackSection,
    DataFlowSection,
    RoutingSection,
    AddingFeaturesSection,
    ComponentsSection,
    StateManagementSection,
    ApiIntegrationSection,
    I18nSection,
    ErrorHandlingSection,
    DeploymentSection,
    BestPracticesSection,
} from '../components/sections';

// Section types
type Section =
    | 'overview'
    | 'folder-structure'
    | 'tech-stack'
    | 'data-flow'
    | 'routing'
    | 'adding-features'
    | 'components'
    | 'state-management'
    | 'api-integration'
    | 'i18n'
    | 'error-handling'
    | 'deployment'
    | 'best-practices';

/**
 * Architecture Documentation component
 * @returns JSX Element
 */
const ArchitectureDocs: React.FC = () => {
    const [activeSection, setActiveSection] = useState<Section>('overview');

    const sections = [
        { id: 'overview', label: 'Architecture Overview', icon: <ArchitectureIcon /> },
        { id: 'folder-structure', label: 'Folder Structure', icon: <FolderIcon /> },
        { id: 'tech-stack', label: 'Technology Stack', icon: <DataObjectIcon /> },
        { id: 'data-flow', label: 'Data Flow & State', icon: <SpeedIcon /> },
        { id: 'routing', label: 'Routing Architecture', icon: <SecurityIcon /> },
        { id: 'adding-features', label: 'Adding New Features', icon: <BugReportIcon /> },
        { id: 'components', label: 'Component Library', icon: <CodeIcon /> },
        { id: 'state-management', label: 'State Management', icon: <StorageIcon /> },
        { id: 'api-integration', label: 'API Integration', icon: <CloudUploadIcon /> },
        { id: 'i18n', label: 'Internationalization', icon: <LanguageIcon /> },
        { id: 'error-handling', label: 'Error Handling', icon: <BugReportIcon /> },
        { id: 'deployment', label: 'Deployment', icon: <SettingsIcon /> },
        { id: 'best-practices', label: 'Best Practices', icon: <CheckCircleIcon /> },
    ];

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                📚 Architecture Documentation
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Complete guide to the application architecture, patterns, and best practices.
            </Typography>

            <Grid container spacing={3}>
                {/* Navigation Sidebar */}
                <Grid item xs={12} md={3}>
                    <Paper
                        sx={{
                            position: 'sticky',
                            top: 80,
                            maxHeight: 'calc(100vh - 100px)',
                            overflow: 'auto',
                        }}
                    >
                        <List>
                            {sections.map((section) => (
                                <ListItem key={section.id} disablePadding>
                                    <ListItemButton
                                        selected={activeSection === section.id}
                                        onClick={() => setActiveSection(section.id as Section)}
                                    >
                                        <Box
                                            sx={{
                                                mr: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: activeSection === section.id ? 'primary.main' : 'text.secondary',
                                            }}
                                        >
                                            {section.icon}
                                        </Box>
                                        <ListItemText
                                            primary={section.label}
                                            primaryTypographyProps={{
                                                variant: activeSection === section.id ? 'body2' : 'body2',
                                                fontWeight: activeSection === section.id ? 600 : 400,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Content Area */}
                <Grid item xs={12} md={9}>
                    {activeSection === 'overview' && <OverviewSection />}
                    {activeSection === 'folder-structure' && <FolderStructureSection />}
                    {activeSection === 'tech-stack' && <TechStackSection />}
                    {activeSection === 'data-flow' && <DataFlowSection />}
                    {activeSection === 'routing' && <RoutingSection />}
                    {activeSection === 'adding-features' && <AddingFeaturesSection />}
                    {activeSection === 'components' && <ComponentsSection />}
                    {activeSection === 'state-management' && <StateManagementSection />}
                    {activeSection === 'api-integration' && <ApiIntegrationSection />}
                    {activeSection === 'i18n' && <I18nSection />}
                    {activeSection === 'error-handling' && <ErrorHandlingSection />}
                    {activeSection === 'deployment' && <DeploymentSection />}
                    {activeSection === 'best-practices' && <BestPracticesSection />}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ArchitectureDocs;
