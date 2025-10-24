/**
 * Type definitions for DataGrid wrapper component
 * Server-side pagination support
 */

export interface DataGridColumn<T = any> {
    id: keyof T | string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    format?: (value: any, row: T) => React.ReactNode;
}

export interface PaginationState {
    page: number;
    pageSize: number;
    totalRows: number;
}

export interface SortState {
    field: string;
    direction: 'asc' | 'desc';
}

export interface DataGridProps<T = any> {
    columns: DataGridColumn<T>[];
    rows: T[];
    loading?: boolean;
    pagination: PaginationState;
    onPaginationChange: (page: number, pageSize: number) => void;
    onSortChange?: (sort: SortState) => void;
    onRowClick?: (row: T) => void;
    rowsPerPageOptions?: number[];
    emptyMessage?: string;
    sx?: any;
}
