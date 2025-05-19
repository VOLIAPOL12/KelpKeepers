import React from 'react';
import {
    Paper,
    Typography,
} from '@mui/material';

const DashboardCard = ({ title, children, bgcolor }) => {
    return (
        <Paper
            elevation={3}
            sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: bgcolor || 'white',
            height: '100%',
            }}
        >
            <Typography variant="h5" fontWeight={600} gutterBottom>
            {title}
            </Typography>
            {children}
        </Paper>
    );
};

export default DashboardCard;