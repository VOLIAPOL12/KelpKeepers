import React from 'react';
import { Box, Fade } from '@mui/material';

function VideoBackground({ videoSrc, darkOverlay }) {
    return (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 35, 50, 0.3)',
          }} />
          
          <Fade in={darkOverlay} timeout={1000}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 35, 50, 0.4)',
            }} />
          </Fade>
        </Box>
      );
}

export default VideoBackground