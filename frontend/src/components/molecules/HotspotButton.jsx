import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { GlobalStyles } from '@mui/material';

function HotspotButton({ position, onClick, tooltip }) {
  return (
    <Box sx={{
      position: 'absolute',
      ...position,
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
    }}>
      <Tooltip title={tooltip}>
        <IconButton
          onClick={onClick}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
            },
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            animation: 'pulseGlow1 2s infinite ease-in-out',
          }}
        >
          <AddCircleOutlineIcon 
            sx={{ 
              color: tooltip!=="CLIMATE FIGHTING POWERHOUSE" ? 'white' : 'black',
              fontSize: '2rem',
              
            }} 
          />
        </IconButton>
      </Tooltip>

      <GlobalStyles styles={{
        '@keyframes pulseGlow1': {
          '0%': {
            filter: 'drop-shadow(0 0 5px white) drop-shadow(0 0 10px white)',
            transform: 'scale(1)'
          },
          '50%': {
            filter: 'drop-shadow(0 0 100px white) drop-shadow(0 0 30px white)',
            transform: 'scale(1.1)'
          },
          '100%': {
            filter: 'drop-shadow(0 0 5px white) drop-shadow(0 0 10px white)',
            transform: 'scale(1)'
          }
        }
      }} />
    </Box>
  );
}

export default HotspotButton;