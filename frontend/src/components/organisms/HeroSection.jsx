import React from 'react';
import { Button, Container, useTheme } from '@mui/material';
import FadeTypography from '../atoms/FadeTypography';
import VideoBackground from '../molecules/VideoBackground';

function HeroSection({ 
        showTitle, 
        showSubtitle, 
        showButton, 
        darkOverlay, 
        onStartJourney 
    }) {
    const theme = useTheme();
  return (
    <>
      <VideoBackground videoSrc="/src/assets/kelp-bg.mp4" darkOverlay={darkOverlay} />

      <Container maxWidth="md" sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        pt: 2,
        pb: 2
      }}>
        <FadeTypography 
          show={showTitle}
          timeout={1000}
          variant="h1" 
          component="h1" 
          sx={{ 
            color: 'white', 
            fontFamily: "'Reggae One', cursive", 
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
            lineHeight: 1.2,
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          KELP FORESTS OF AUSTRALIA
        </FadeTypography>

        <FadeTypography 
          show={showSubtitle}
          timeout={1000}
          variant="h6" 
          component="p" 
          sx={{ 
            color: 'white', 
            maxWidth: 600,
            mb: 4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          Help safeguarding these irreplaceable marine habitats for future generations.
        </FadeTypography>

        <FadeTypography show={showButton} timeout={1000} component="div">
          <Button 
            variant="contained" 
            size="large"
            onClick={onStartJourney}
            sx={{ 
              bgcolor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 28,
              px: 4,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              }
            }}
          >
            Start the journey
          </Button>
        </FadeTypography>
      </Container>
    </>
  )
}

export default HeroSection