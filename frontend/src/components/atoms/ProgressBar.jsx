import React from 'react';
import { Box, LinearProgress } from '@mui/material';

function ProgressBar({ value, sx }) {
    return (
        <Box sx={{ width: '100%', ...sx }}>
          <LinearProgress 
            variant="determinate" 
            value={value} 
            sx={{
              height: 4,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'white'
              }
            }}
          />
        </Box>
      );
}

export default ProgressBar