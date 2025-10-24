/**
 * Components Showcase Page
 * Demonstrates all wrapper components with live examples
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
} from '@mui/icons-material';
import { useNotification } from '@hooks/useNotification';
import { QuickReference } from '../components/QuickReference';

/**
 * Components Showcase component
 * @returns JSX Element
 */
const ComponentsShowcase: React.FC = () => {
    const { showSuccess, showInfo } = useNotification();

    // State for various components
    const [loading, setLoading] = useState(false);
    const [textValue, setTextValue] = useState('');
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
    ];

    const tableColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 200 },
        {
            id: 'status',
            label: 'Status',
            format: (value: string) => <Chip label={value} status={value as any} />,
        },
    ];

    const tableRows = [
        { name: 'John Doe', email: 'john@example.com', status: 'success' },
        { name: 'Jane Smith', email: 'jane@example.com', status: 'warning' },
        { name: 'Bob Johnson', email: 'bob@example.com', status: 'error' },
    ];

    const handleButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showSuccess('Action completed successfully!');
        }, 2000);
    };

    const handleDialogConfirm = () => {
        showInfo('Dialog confirmed!');
        setDialogOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Component Library Showcase
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Interactive examples of all available wrapper components with code snippets and best practices.
            </Typography>

            <Box sx={{ mb: 4 }}>
                <QuickReference />
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Buttons Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Buttons
                </Typography>
                <Paper sx={{ p: 3 }}>
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
                    </Grid>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Button variant="primary" loading={loading} onClick={handleClick}>
  Primary Button
</Button>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Text Fields Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Text Fields
                </Typography>
                <Paper sx={{ p: 3 }}>
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
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                type="email"
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
                    </Grid>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<TextField
  label="Standard Text Field"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  showCharCount
  maxLength={50}
  fullWidth
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Select Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Select Dropdowns
                </Typography>
                <Paper sx={{ p: 3 }}>
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
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Select
  label="Choose an option"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Checkboxes and Switches Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Checkboxes & Switches
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Checkbox
                                label="Accept terms and conditions"
                                checked={checkboxValue}
                                onChange={(e) => setCheckboxValue(e.target.checked)}
                            />
                            <Checkbox
                                label="With helper text"
                                helperText="This is additional information"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Checkbox
  label="Accept terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Radio Group Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Radio Groups
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <RadioGroup
                        label="Choose an option"
                        value={radioValue}
                        onChange={(e) => setRadioValue(e.target.value)}
                        options={radioOptions}
                    />
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<RadioGroup
  label="Choose an option"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Autocomplete Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Autocomplete
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Autocomplete
                        label="Select a fruit"
                        options={autocompleteOptions}
                        value={autocompleteValue}
                        onChange={(_, newValue) => setAutocompleteValue(newValue)}
                        getOptionLabel={(option) => option.label}
                    />
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Autocomplete
  label="Select a fruit"
  options={options}
  value={value}
  onChange={(_, newValue) => setValue(newValue)}
  getOptionLabel={(option) => option.label}
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Date Picker Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Date Picker
                </Typography>
                <Paper sx={{ p: 3 }}>
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
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<DatePicker
  label="Select Date"
  value={date}
  onChange={setDate}
  maxDate={new Date()}
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Slider Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Slider
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Slider
                        label="Volume"
                        value={sliderValue}
                        onChange={(_, value) => setSliderValue(value as number)}
                        min={0}
                        max={100}
                        showValue
                    />
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Slider
  label="Volume"
  value={volume}
  onChange={(_, value) => setVolume(value)}
  min={0}
  max={100}
  showValue
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Chips Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Chips
                </Typography>
                <Paper sx={{ p: 3 }}>
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
                    </Grid>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Chip label="Success" status="success" />
<Chip label="Deletable" onDelete={handleDelete} />`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Alerts Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Alerts
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Alert severity="success">This is a success alert</Alert>
                        </Grid>
                        <Grid item>
                            <Alert severity="info">This is an info alert</Alert>
                        </Grid>
                        <Grid item>
                            <Alert severity="warning">This is a warning alert</Alert>
                        </Grid>
                        <Grid item>
                            <Alert severity="error">This is an error alert</Alert>
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
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Alert severity="success" onClose={handleClose}>
  This is a success alert
</Alert>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Icons and Badges Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Icon Buttons & Badges
                </Typography>
                <Paper sx={{ p: 3 }}>
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
                                <MailIcon />
                            </Badge>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<IconButton tooltip="Delete" color="error">
  <DeleteIcon />
</IconButton>

<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Tabs Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Tabs
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        tabs={[
                            { label: 'Tab 1', value: 'tab1' },
                            { label: 'Tab 2', value: 'tab2' },
                            { label: 'Tab 3', value: 'tab3' },
                        ]}
                    />
                    <Box sx={{ p: 2 }}>
                        <Typography>Active tab: {activeTab}</Typography>
                    </Box>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Tabs
  value={activeTab}
  onChange={(_, value) => setActiveTab(value)}
  tabs={[
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
  ]}
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Dialog Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Dialogs
                </Typography>
                <Paper sx={{ p: 3 }}>
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
                        <Typography>Are you sure you want to proceed with this action?</Typography>
                    </Dialog>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Dialog
  open={open}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="Confirm Action"
>
  Dialog content here
</Dialog>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Card Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Cards
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card
                            title="Simple Card"
                            subtitle="With subtitle"
                        >
                            <Typography variant="body2">
                                This is the card content area.
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
                                This card has hover effects.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            title="Card with Actions"
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
                                This card has action buttons.
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography variant="caption" component="pre">
                        {`<Card
  title="Card Title"
  subtitle="Card subtitle"
  hoverable
  actions={<Button>Action</Button>}
>
  Card content
</Card>`}
                    </Typography>
                </Box>
            </Box>

            {/* Table Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Tables
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Table
                        columns={tableColumns}
                        rows={tableRows}
                        onRowClick={(row) => showInfo(`Clicked: ${row.name}`)}
                    />
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="caption" component="pre">
                            {`<Table
  columns={[
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'status', label: 'Status',
      format: (value) => <Chip label={value} />
    },
  ]}
  rows={data}
  onRowClick={handleRowClick}
/>`}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ComponentsShowcase;
