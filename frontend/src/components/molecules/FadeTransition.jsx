import React from 'react'
import { Box, Fade } from '@mui/material';


function FadeTransition({ show, timeout = 800 }) {
    return (
      <Fade in={show} timeout={timeout}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          zIndex: 100
        }} />
      </Fade>
    );
}

export default FadeTransition