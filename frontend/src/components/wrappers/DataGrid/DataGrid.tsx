/**
 * DataGrid wrapper component
 * Server-side pagination with sorting support
 */
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    Paper,
    Box,
    Typography,
    Skeleton,
    LinearProgress,
} from '@mui/material';
import { DataGridProps, SortState } from './DataGrid.types';

/**
 * DataGrid component for server-side pagination
 * @param props - DataGrid properties
 * @returns JSX Element
 */
export function DataGrid<T extends Record<string, any>>({
    columns,
    rows,
    loading = false,
    pagination,
    onPaginationChange,
    onSortChange,
    onRowClick,
    rowsPerPageOptions = [10, 25, 50, 100],
    emptyMessage = 'No data available',
    sx,
}: DataGridProps<T>) {
    const [sort, setSort] = useState<SortState | null>(null);

    const handleChangePage = (_event: unknown, newPage: number) => {
        onPaginationChange(newPage, pagination.pageSize);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPageSize = parseInt(event.target.value, 10);
        onPaginationChange(0, newPageSize);
    };

    const handleSort = (field: string) => {
        if (!onSortChange) return;

        const isAsc = sort?.field === field && sort?.direction === 'asc';
        const newSort: SortState = {
            field,
            direction: isAsc ? 'desc' : 'asc',
        };
        setSort(newSort);
        onSortChange(newSort);
    };

    const renderCell = (column: any, row: T) => {
        const value = row[column.id as keyof T];
        return column.format ? column.format(value, row) : value;
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', ...sx }}>
            <TableContainer>
                {loading && <LinearProgress />}
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={String(column.id)}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                >
                                    {column.sortable && onSortChange ? (
                                        <TableSortLabel
                                            active={sort?.field === column.id}
                                            direction={sort?.field === column.id ? sort.direction : 'asc'}
                                            onClick={() => handleSort(String(column.id))}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            // Loading skeleton
                            Array.from({ length: pagination.pageSize }).map((_, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={String(column.id)}>
                                            <Skeleton />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : rows.length === 0 ? (
                            // Empty state
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Box sx={{ py: 4 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {emptyMessage}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Data rows
                            rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    hover={!!onRowClick}
                                    onClick={() => onRowClick?.(row)}
                                    sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                >
                                    {columns.map((column) => (
                                        <TableCell key={String(column.id)} align={column.align}>
                                            {renderCell(column, row)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={pagination.totalRows}
                rowsPerPage={pagination.pageSize}
                page={pagination.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default DataGrid;
