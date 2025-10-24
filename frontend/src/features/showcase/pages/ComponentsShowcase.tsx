/**
 * Components Showcase Page
 * Demonstrates all wrapper components with live examples and best practices
 */
import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Divider,
    Paper,
} from '@mui/material';
import {
    Button,
    TextField,
    Select,
    Checkbox,
    RadioGroup,
    Switch,
    Autocomplete,
    DatePicker,
    Dialog,
    Card,
    Chip,
    Alert,
    Tabs,
    Table,
    Slider,
    IconButton,
    Badge,
} from '@components/wrappers';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Mail as MailIcon,
    Notifications as NotificationsIcon,
    Info as InfoIcon,
} from '@mui/icons-material';
import { useNotification } from '@hooks/useNotification';
import { QuickReference, CodeBlock } from '../components';
import { useNavigate } from 'react-router-dom';

/**
 * Components Showcase component
 * @returns JSX Element
 */
const ComponentsShowcase: React.FC = () => {
    const { showSuccess, showInfo } = useNotification();
    const navigate = useNavigate();
    // State for various components
    const [loading, setLoading] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [radioValue, setRadioValue] = useState('option1');
    const [switchValue, setSwitchValue] = useState(false);
    const [autocompleteValue, setAutocompleteValue] = useState<any>(null);
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string | number>('tab1');
    const [sliderValue, setSliderValue] = useState(30);

    // Sample data
    const selectOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
    ];

    const radioOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const autocompleteOptions = [
        { label: 'Apple', value: 1 },
        { label: 'Banana', value: 2 },
        { label: 'Cherry', value: 3 },
        { label: 'Date', value: 4 },
        { label: 'Elderberry', value: 5 },
    ];

    const tableColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 200 },
        {
            id: 'status',
            label: 'Status',
            format: (value: string) => (
                <Chip
                    label={value}
                    status={value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'error'}
                />
            ),
        },
    ];

    const tableRows = [
        { name: 'John Doe', email: 'john@example.com', status: 'Active' },
        { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
        { name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
    ];

    const tabItems = [
        { label: 'Overview', value: 'tab1' },
        { label: 'Details', value: 'tab2' },
        { label: 'Settings', value: 'tab3' },
    ];

    /**
     * Handles button click with simulated async operation
     */
    const handleButtonClick = (): void => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showSuccess('Action completed successfully!');
        }, 2000);
    };

    /**
     * Handles dialog confirmation
     */
    const handleDialogConfirm = (): void => {
        showInfo('Dialog confirmed!');
        setDialogOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Typography variant="h3" component="h1" gutterBottom>
                Component Library Showcase
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Interactive examples of all available wrapper components with code snippets and best practices.
                All components are fully typed, theme-aware, and follow our architecture patterns.
            </Typography>

            {/* Quick Reference Card */}
            <Box sx={{ mb: 4 }}>
                <QuickReference />
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Buttons Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="buttons">
                    Buttons
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Buttons support loading states, icons, and various variants.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="primary" onClick={handleButtonClick} loading={loading}>
                                Primary Button
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="secondary" onClick={handleButtonClick}>
                                Secondary Button
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={handleButtonClick}>
                                Outlined Button
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="text" onClick={handleButtonClick}>
                                Text Button
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="primary" startIcon={<AddIcon />} onClick={handleButtonClick}>
                                With Icon
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="primary" disabled>
                                Disabled
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="primary" color="error" startIcon={<DeleteIcon />}>
                                Danger Action
                            </Button>
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<Button variant="primary" loading={loading} onClick={handleClick}>
  Primary Button
</Button>

<Button variant="outlined" startIcon={<AddIcon />}>
  With Icon
</Button>

<Button variant="primary" disabled>
  Disabled
</Button>`}
                    />
                </Paper>
            </Box>

            {/* Text Fields Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="textfields">
                    Text Fields
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Text fields with validation, character count, and various input types.
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Standard Text Field"
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                placeholder="Enter text..."
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="With Character Count"
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                showCharCount
                                maxLength={50}
                                helperText="Maximum 50 characters"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                type="email"
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                helperText="Enter your email address"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="With Error"
                                error
                                helperText="This field is required"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Password"
                                type="password"
                                helperText="Enter a secure password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Disabled"
                                value="Disabled field"
                                disabled
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<TextField
  label="With Character Count"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  showCharCount
  maxLength={50}
  helperText="Maximum 50 characters"
  fullWidth
/>

<TextField
  label="Email"
  type="email"
  error={!!errors.email}
  helperText={errors.email}
  fullWidth
/>`}
                    />
                </Paper>
            </Box>

            {/* Select Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="select">
                    Select Dropdowns
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Dropdowns with array-based options for easy configuration.
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Select
                                label="Choose an option"
                                value={selectValue}
                                onChange={(e) => setSelectValue(e.target.value as string)}
                                options={selectOptions}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Select
                                label="With Error"
                                value={selectValue}
                                onChange={(e) => setSelectValue(e.target.value as string)}
                                options={selectOptions}
                                error
                                helperText="Please select an option"
                            />
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<Select
  label="Choose an option"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ]}
  error={!!errors.field}
  helperText={errors.field}
/>`}
                    />
                </Paper>
            </Box>

            {/* Checkboxes and Switches Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="checkboxes-switches">
                    Checkboxes & Switches
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Binary controls for toggling options and settings.
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Checkboxes
                            </Typography>
                            <Checkbox
                                label="Accept terms and conditions"
                                checked={checkboxValue}
                                onChange={(e) => setCheckboxValue(e.target.checked)}
                            />
                            <Checkbox
                                label="With helper text"
                                helperText="This is additional information"
                            />
                            <Checkbox label="Disabled" disabled />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Switches
                            </Typography>
                            <Switch
                                label="Enable notifications"
                                checked={switchValue}
                                onChange={(e) => setSwitchValue(e.target.checked)}
                            />
                            <Switch
                                label="Dark mode"
                                helperText="Toggle theme mode"
                                labelPlacement="start"
                            />
                            <Switch label="Disabled" disabled />
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<Checkbox
  label="Accept terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  helperText="Required for registration"
/>

<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  labelPlacement="start"
/>`}
                    />
                </Paper>
            </Box>

            {/* Radio Group Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="radio">
                    Radio Groups
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Radio buttons for mutually exclusive options.
                    </Typography>
                    <RadioGroup
                        label="Choose an option"
                        value={radioValue}
                        onChange={(e) => setRadioValue(e.target.value)}
                        options={radioOptions}
                    />
                    <CodeBlock
                        language="tsx"
                        code={`<RadioGroup
  label="Choose an option"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  error={!!errors.field}
  helperText={errors.field}
/>`}
                    />
                </Paper>
            </Box>

            {/* Autocomplete Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="autocomplete">
                    Autocomplete
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Searchable dropdown with auto-completion.
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                label="Select a fruit"
                                options={autocompleteOptions}
                                value={autocompleteValue}
                                onChange={(_, newValue) => setAutocompleteValue(newValue)}
                                getOptionLabel={(option) => option.label}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                label="With Error"
                                options={autocompleteOptions}
                                value={autocompleteValue}
                                onChange={(_, newValue) => setAutocompleteValue(newValue)}
                                getOptionLabel={(option) => option.label}
                                error
                                helperText="Please select a value"
                            />
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<Autocomplete
  label="Select a fruit"
  options={options}
  value={value}
  onChange={(_, newValue) => setValue(newValue)}
  getOptionLabel={(option) => option.label}
  error={!!errors.field}
  helperText={errors.field}
/>`}
                    />
                </Paper>
            </Box>

            {/* Date Picker Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="datepicker">
                    Date Picker
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        HTML5 date input with min/max date support.
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Select Date"
                                value={dateValue}
                                onChange={setDateValue}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Birth Date"
                                value={dateValue}
                                onChange={setDateValue}
                                maxDate={new Date()}
                                helperText="Maximum date is today"
                            />
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<DatePicker
  label="Birth Date"
  value={date}
  onChange={setDate}
  maxDate={new Date()}
  helperText="Maximum date is today"
  error={!!errors.date}
/>`}
                    />
                </Paper>
            </Box>

            {/* Slider Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="slider">
                    Slider
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Slider for selecting numeric values within a range.
                    </Typography>
                    <Slider
                        label="Volume"
                        value={sliderValue}
                        onChange={(_, value) => setSliderValue(value as number)}
                        min={0}
                        max={100}
                        showValue
                    />
                    <Box sx={{ mt: 3 }}>
                        <Slider
                            label="Temperature"
                            value={50}
                            min={0}
                            max={100}
                            marks={[
                                { value: 0, label: '0°C' },
                                { value: 50, label: '50°C' },
                                { value: 100, label: '100°C' },
                            ]}
                        />
                    </Box>
                    <CodeBlock
                        language="tsx"
                        code={`<Slider
  label="Volume"
  value={volume}
  onChange={(_, value) => setVolume(value)}
  min={0}
  max={100}
  showValue
  helperText="Adjust volume level"
/>`}
                    />
                </Paper>
            </Box>

            {/* Chips Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="chips">
                    Chips
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Compact elements for tags, status indicators, or selections.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Chip label="Default" />
                        </Grid>
                        <Grid item>
                            <Chip label="Success" status="success" />
                        </Grid>
                        <Grid item>
                            <Chip label="Error" status="error" />
                        </Grid>
                        <Grid item>
                            <Chip label="Warning" status="warning" />
                        </Grid>
                        <Grid item>
                            <Chip label="Info" status="info" />
                        </Grid>
                        <Grid item>
                            <Chip label="Deletable" onDelete={() => showInfo('Chip deleted')} />
                        </Grid>
                        <Grid item>
                            <Chip
                                label="Clickable"
                                onClick={() => showInfo('Chip clicked')}
                                icon={<InfoIcon />}
                            />
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<Chip label="Success" status="success" />
<Chip label="Error" status="error" />
<Chip label="Deletable" onDelete={handleDelete} />
<Chip label="Clickable" onClick={handleClick} icon={<InfoIcon />} />`}
                    />
                </Paper>
            </Box>

            {/* Alerts Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="alerts">
                    Alerts
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Display important messages with different severity levels.
                    </Typography>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Alert severity="success">This is a success alert — check it out!</Alert>
                        </Grid>
                        <Grid item>
                            <Alert severity="info">This is an info alert — check it out!</Alert>
                        </Grid>
                        <Grid item>
                            <Alert severity="warning">This is a warning alert — check it out!</Alert>
                        </Grid>
                        <Grid item>
                            <Alert severity="error">This is an error alert — check it out!</Alert>
                        </Grid>
                        <Grid item>
                            <Alert
                                severity="info"
                                onClose={() => showInfo('Alert closed')}
                            >
                                This alert can be closed
                            </Alert>
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<Alert severity="success">
  This is a success alert!
</Alert>

<Alert severity="error" onClose={handleClose}>
  This alert can be closed
</Alert>`}
                    />
                </Paper>
            </Box>

            {/* Icons and Badges Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="icons-badges">
                    Icon Buttons & Badges
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Icon buttons with tooltips and badges for notifications.
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <IconButton tooltip="Add item" color="primary">
                                <AddIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton tooltip="Edit" color="primary">
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton tooltip="Delete" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton tooltip="Save" loading={loading} color="success">
                                <SaveIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Badge badgeContent={4} color="primary">
                                <MailIcon />
                            </Badge>
                        </Grid>
                        <Grid item>
                            <Badge badgeContent={99} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </Grid>
                        <Grid item>
                            <Badge status="online">
                                <MailIcon color="action" />
                            </Badge>
                        </Grid>
                    </Grid>
                    <CodeBlock
                        language="tsx"
                        code={`<IconButton tooltip="Delete" color="error" onClick={handleDelete}>
  <DeleteIcon />
</IconButton>

<IconButton tooltip="Save" loading={loading}>
  <SaveIcon />
</IconButton>

<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>

<Badge status="online">
  <Avatar />
</Badge>`}
                    />
                </Paper>
            </Box>

            {/* Tabs Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="tabs">
                    Tabs
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Organize content into separate views with tabs.
                    </Typography>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        tabs={tabItems}
                    />
                    <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1, mt: 2 }}>
                        <Typography variant="body2">
                            Active tab content: <strong>{activeTab}</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            Tab content would be displayed here based on the active tab.
                        </Typography>
                    </Box>
                    <CodeBlock
                        language="tsx"
                        code={`<Tabs
  value={activeTab}
  onChange={(_, value) => setActiveTab(value)}
  tabs={[
    { label: 'Overview', value: 'tab1' },
    { label: 'Details', value: 'tab2' },
    { label: 'Settings', value: 'tab3' },
  ]}
/>

{/* Tab content */}
{activeTab === 'tab1' && <Overview />}
{activeTab === 'tab2' && <Details />}
{activeTab === 'tab3' && <Settings />}`}
                    />
                </Paper>
            </Box>

            {/* Dialog Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="dialog">
                    Dialogs
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Modal dialogs for confirmations and user input.
                    </Typography>
                    <Button variant="primary" onClick={() => setDialogOpen(true)}>
                        Open Dialog
                    </Button>
                    <Dialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        onConfirm={handleDialogConfirm}
                        title="Confirm Action"
                        confirmText="Yes, Proceed"
                        cancelText="Cancel"
                    >
                        <Typography>
                            Are you sure you want to proceed with this action? This action cannot be undone.
                        </Typography>
                    </Dialog>
                    <CodeBlock
                        language="tsx"
                        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  Open Dialog
</Button>

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  onConfirm={handleConfirm}
  title="Confirm Action"
  confirmText="Yes, Delete"
  cancelText="Cancel"
  loading={isDeleting}
>
  Are you sure you want to delete this item?
</Dialog>`}
                    />
                </Paper>
            </Box>

            {/* Card Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="cards">
                    Cards
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Container components for grouping related content.
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card
                            title="Simple Card"
                            subtitle="With subtitle"
                        >
                            <Typography variant="body2">
                                This is a simple card with title and subtitle. Cards are perfect for displaying grouped information.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            title="Hoverable Card"
                            subtitle="Hover to see effect"
                            hoverable
                        >
                            <Typography variant="body2">
                                This card has hover effects. It will slightly elevate and show a shadow when you hover over it.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            title="Card with Actions"
                            subtitle="Actions in footer"
                            actions={
                                <>
                                    <Button variant="text" size="small">
                                        Cancel
                                    </Button>
                                    <Button variant="primary" size="small">
                                        Save
                                    </Button>
                                </>
                            }
                        >
                            <Typography variant="body2">
                                This card includes action buttons in the footer area.
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <CodeBlock
                        language="tsx"
                        code={`<Card
  title="Card Title"
  subtitle="Card subtitle"
  hoverable
  actions={
    <>
      <Button variant="text">Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  }
>
  <Typography>Card content goes here</Typography>
</Card>`}
                    />
                </Box>
            </Box>

            {/* Table Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom id="tables">
                    Tables
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Display data in rows and columns with formatting support.
                    </Typography>
                    <Table
                        columns={tableColumns}
                        rows={tableRows}
                        onRowClick={(row) => showInfo(`Clicked: ${row.name}`)}
                    />
                    <CodeBlock
                        language="tsx"
                        code={`<Table
  columns={[
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { 
      id: 'status', 
      label: 'Status',
      format: (value) => <Chip label={value} status={value} />
    },
  ]}
  rows={data}
  loading={isLoading}
  onRowClick={handleRowClick}
  emptyMessage="No data available"
/>`}
                    />
                </Paper>
            </Box>

            {/* Footer */}
            <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Need More Help?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Check out the complete architecture documentation for more details...
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/docs')}>
                    View Architecture Documentation
                </Button>
            </Box>
        </Container>
    );
};

export default ComponentsShowcase;
