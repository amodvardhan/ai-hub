/**
 * Type definitions for custom Tabs wrapper component
 */
import { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import { SyntheticEvent } from 'react';

export interface TabItem {
    label: string;
    value: string | number;
    disabled?: boolean;
    icon?: React.ReactElement;
}

export interface CustomTabsProps extends Omit<MuiTabsProps, 'children' | 'onChange'> {
    tabs: TabItem[];
    value: string | number;
    onChange: (event: SyntheticEvent, value: string | number) => void;
}
