/**
 * Custom Tabs wrapper component
 * Wraps Material-UI Tabs with array-based API
 */
import React, { SyntheticEvent } from 'react';
import { Tabs as MuiTabs, Tab } from '@mui/material';
import { CustomTabsProps } from './Tabs.types';

/**
 * Enterprise tabs component with array-based tabs
 * @param props - Tabs properties
 * @returns JSX Element
 */
export const Tabs: React.FC<CustomTabsProps> = ({ tabs, value, onChange, ...rest }) => {
    const handleChange = (event: SyntheticEvent, newValue: string | number) => {
        onChange(event, newValue);
    };

    return (
        <MuiTabs value={value} onChange={handleChange} {...rest}>
            {tabs.map((tab) => (
                <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    disabled={tab.disabled}
                    icon={tab.icon}
                    iconPosition={tab.icon ? 'start' : undefined}
                />
            ))}
        </MuiTabs>
    );
};

export default Tabs;
