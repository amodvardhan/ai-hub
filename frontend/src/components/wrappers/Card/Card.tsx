/**
 * Custom Card wrapper component
 * Wraps Material-UI Card with title, subtitle, and actions support
 */
import React from 'react';
import {
    Card as MuiCard,
    CardHeader,
    CardContent,
    CardActions,
    Skeleton,
} from '@mui/material';
import { CustomCardProps } from './Card.types';

/**
 * Enterprise card component with header and actions
 * @param props - Card properties
 * @returns JSX Element
 */
export const Card: React.FC<CustomCardProps> = ({
    title,
    subtitle,
    actions,
    loading = false,
    hoverable = false,
    children,
    sx,
    ...rest
}) => {
    return (
        <MuiCard
            sx={{
                ...(hoverable && {
                    '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease-in-out',
                    },
                }),
                ...sx,
            }}
            {...rest}
        >
            {(title || subtitle) && (
                <CardHeader
                    title={loading ? <Skeleton width="60%" /> : title}
                    subheader={loading ? <Skeleton width="40%" /> : subtitle}
                />
            )}
            <CardContent>
                {loading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton width="80%" />
                    </>
                ) : (
                    children
                )}
            </CardContent>
            {actions && !loading && <CardActions>{actions}</CardActions>}
        </MuiCard>
    );
};

export default Card;
