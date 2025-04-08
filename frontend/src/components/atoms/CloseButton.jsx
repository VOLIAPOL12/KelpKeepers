import React from 'react'
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CloseButton({ onClick, color = 'white' }) {
  return (
    <IconButton
        aria-label="close"
        onClick={onClick}
        sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: color,
        }}
    >
        <CloseIcon />
    </IconButton>
  )
}

export default CloseButton