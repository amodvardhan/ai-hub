/**
 * Type definitions for VirtualGrid wrapper component
 * Client-side virtualization for large datasets
 */

export interface VirtualGridColumn<T = any> {
    id: keyof T | string;
    label: string;
    width?: number;
    align?: 'left' | 'right' | 'center';
    format?: (value: any, row: T) => React.ReactNode;
}

export interface VirtualGridProps<T = any> {
    columns: VirtualGridColumn<T>[];
    rows: T[];
    rowHeight?: number;
    headerHeight?: number;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    sx?: any;
}
