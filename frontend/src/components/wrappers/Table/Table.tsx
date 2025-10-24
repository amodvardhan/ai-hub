/**
 * Custom Table wrapper component
 * Wraps Material-UI Table with simplified API
 */
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
    Typography,
} from '@mui/material';
import { CustomTableProps, TableColumn } from './Table.types';

/**
 * Enterprise table component with loading and empty states
 * @param props - Table properties
 * @returns JSX Element
 */
export const Table = <T extends Record<string, any>>({
    columns,
    rows,
    loading = false,
    onRowClick,
    emptyMessage = 'No data available',
    ...rest
}: CustomTableProps<T>) => {
    const renderCell = (column: TableColumn<T>, row: T) => {
        const value = row[column.id];
        return column.format ? column.format(value, row) : value;
    };

    return (
        <TableContainer component={Paper}>
            <MuiTable {...rest}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        <Skeleton />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <Typography variant="body2" color="text.secondary">
                                    {emptyMessage}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row, index) => (
                            <TableRow
                                key={index}
                                hover={!!onRowClick}
                                onClick={() => onRowClick?.(row)}
                                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {renderCell(column, row)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
