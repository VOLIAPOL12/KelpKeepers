import React from 'react';
import { Box, Fade } from '@mui/material';

function VideoBackground({ videoSrc, darkOverlay }) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/1074259084?h=54a096c0d4&autoplay=1&muted=1&background=1&loop=1"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200vh', // (16 / 9) * 100 to fit width by height
            height: '120vh',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />
      
        {/* Static Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 35, 50, 0.3)',
          }}
        />
      
        {/* Animated Dark Overlay */}
        <Fade in={darkOverlay} timeout={1000}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 35, 50, 0.4)',
            }}
          />
        </Fade>
      </Box>
      
      );
}

export default VideoBackground