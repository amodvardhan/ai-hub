/**
 * Type definitions for custom Table wrapper component
 */
import { TableProps as MuiTableProps } from '@mui/material/Table';

export interface TableColumn<T = any> {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'left' | 'right' | 'center';
    format?: (value: any, row: T) => React.ReactNode;
}

export interface CustomTableProps<T = any> extends MuiTableProps {
    columns: TableColumn<T>[];
    rows: T[];
    loading?: boolean;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}
