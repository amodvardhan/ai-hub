/**
 * VirtualGrid wrapper component
 * Client-side virtualization for large datasets
 */
import React, { useRef, useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
} from '@mui/material';
import { VirtualGridProps } from './VirtualGrid.types';

/**
 * VirtualGrid component with virtualization
 * @param props - VirtualGrid properties
 * @returns JSX Element
 */
export function VirtualGrid<T extends Record<string, any>>({
    columns,
    rows,
    rowHeight = 53,
    headerHeight = 56,
    onRowClick,
    emptyMessage = 'No data available',
    sx,
}: VirtualGridProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [containerHeight, setContainerHeight] = useState(600);

    // Calculate visible range (accounting for header height)
    const availableHeight = containerHeight - headerHeight;
    const totalHeight = rows.length * rowHeight;
    const visibleStart = Math.floor(scrollTop / rowHeight);
    const visibleCount = Math.ceil(availableHeight / rowHeight) + 2; // Buffer rows
    const visibleEnd = Math.min(visibleStart + visibleCount, rows.length);
    const offsetY = visibleStart * rowHeight;

    // Get visible rows
    const visibleRows = rows.slice(visibleStart, visibleEnd);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateHeight = () => {
            setContainerHeight(container.clientHeight);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
    };

    const renderCell = (column: any, row: T) => {
        const value = row[column.id as keyof T];
        return column.format ? column.format(value, row) : value;
    };

    if (rows.length === 0) {
        return (
            <Paper sx={{ width: '100%', ...sx }}>
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        {emptyMessage}
                    </Typography>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', ...sx }}>
            <TableContainer
                ref={containerRef}
                onScroll={handleScroll}
                sx={{
                    maxHeight: 600,
                    overflow: 'auto',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ height: headerHeight }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={String(column.id)}
                                    align={column.align}
                                    style={{ width: column.width }}
                                    sx={{ height: headerHeight }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Spacer for scrolled content above */}
                        {offsetY > 0 && (
                            <TableRow style={{ height: offsetY }}>
                                <TableCell colSpan={columns.length} style={{ padding: 0, border: 0 }} />
                            </TableRow>
                        )}

                        {/* Visible rows */}
                        {visibleRows.map((row, index) => {
                            const actualIndex = visibleStart + index;
                            return (
                                <TableRow
                                    key={actualIndex}
                                    hover={!!onRowClick}
                                    onClick={() => onRowClick?.(row)}
                                    sx={{
                                        cursor: onRowClick ? 'pointer' : 'default',
                                        height: rowHeight,
                                    }}
                                >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={String(column.id)}
                                            align={column.align}
                                            sx={{ height: rowHeight }}
                                        >
                                            {renderCell(column, row)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}

                        {/* Spacer for content below */}
                        {offsetY + visibleRows.length * rowHeight < totalHeight && (
                            <TableRow
                                style={{
                                    height: totalHeight - offsetY - visibleRows.length * rowHeight,
                                }}
                            >
                                <TableCell colSpan={columns.length} style={{ padding: 0, border: 0 }} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary">
                    Showing {visibleStart + 1} - {visibleEnd} of {rows.length} rows (virtualized)
                </Typography>
            </Box>
        </Paper>
    );
}

export default VirtualGrid;
