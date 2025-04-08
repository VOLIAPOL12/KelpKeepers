import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function HotspotButton({ position, isUnlocked, onClick, tooltip }) {
  return (
    <Box sx={{
      position: 'absolute',
      ...position,
      transform: 'translate(50%, -50%)',
      zIndex: 10,
    }}>
      <Tooltip title={isUnlocked ? tooltip : "Explore the kelp first"}>
        <IconButton
          onClick={onClick}
          sx={{
            backgroundColor: isUnlocked ? 'rgba(255, 255, 255, 0.3)' : 'rgba(100, 100, 100, 0.3)',
            '&:hover': {
              backgroundColor: isUnlocked ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 100, 100, 0.3)',
            },
            transition: 'all 0.3s ease',
            cursor: isUnlocked ? 'pointer' : 'not-allowed',
          }}
        >
          <AddCircleOutlineIcon 
            sx={{ 
              color: isUnlocked ? 'white' : 'gray',
              fontSize: '2rem',
            }} 
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default HotspotButton;