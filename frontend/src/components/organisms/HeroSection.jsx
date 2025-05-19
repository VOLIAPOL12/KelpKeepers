import React from 'react';
import { Button, Container, Fade, Grid, Typography } from '@mui/material';
import FadeTypography from '../atoms/FadeTypography';
import VideoBackground from '../molecules/VideoBackground';
import { useNavigate } from 'react-router-dom';

function HeroSection({ 
        showTitle, 
        showSubtitle, 
        showButton, 
        darkOverlay, 
        onStartJourney,
    }) {
  const navigate = useNavigate();
  const directToLoginOrRegistrationPage = (login) => {
    navigate('/login', { state: { login: login } })
  }

  return (
    <>
      <VideoBackground videoSrc="/videos/kelp-bg.mp4" darkOverlay={darkOverlay} />

      <Container maxWidth="xl" sx={{ 
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
            fontSize: { xs: '3rem', sm: '3rem', md: '5rem' },
            lineHeight: 1.2,
            mb: 15,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          KELP FORESTS OF AUSTRALIA
        </FadeTypography>

        <Grid container spacing={2}>
          <Fade in={showSubtitle} timeout={1000}>
            <Grid item xs={12} md={6} sx={{
              borderRight: { xs: 'none', md: '2px solid white' }, // hide on small screens
              pr: { md: 4 }, // add right padding to separate content from line
            }}>
              <FadeTypography 
                show={showSubtitle}
                timeout={1000}
                variant="h6" 
                component="p" 
                sx={{ 
                  color: 'white', 
                  maxWidth: 600,
                  mb: 4,
                  fontSize: { sm: '1rem', md: '1.2rem' },
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  marginBottom: { sm: '9px', md: '18px'},
                  margin: 'auto'
                }}
              >
                New explorer? Dive into our interactive module to discover the wonders of kelp forests in Australia and learn how sea urchins are threatening these precious marine habitats.
              </FadeTypography>

              <FadeTypography show={showButton} timeout={1000} component="div" sx={{
                textAlign: 'center'
              }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => onStartJourney(false)}
                  sx={{ 
                    bgcolor: 'white',
                    color: 'black',
                    fontSize: { sm: '0.6rem', md: '1rem' },
                    borderRadius: 28,
                    display: 'block',
                    margin: 'auto',
                    px: 4,
                    '&:hover': {
                      bgcolor: 'black',
                      color: 'white'
                    }
                  }}
                >
                  Begin Interactive Module
                </Button>
                <Typography variant='boy1' sx={{marginTop: '20px', display: 'block', color: 'white'}}>
                  been here before? Skip to the <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => onStartJourney(true)}>Main Module</span>
                </Typography>
              </FadeTypography>
            </Grid>
          </Fade>
          <Grid item xs={12} md={6} sx={{
            
          }}>
            <FadeTypography 
              show={showSubtitle}
              timeout={1000}
              variant="h6" 
              component="p" 
              sx={{ 
                color: 'white', 
                maxWidth: 600,
                mb: 4,
                fontSize: { sm: '1rem', md: '1.2rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                marginBottom: { sm: '9px', md: '18px'},
                margin: 'auto'
              }}
            >
              Join our community and become a KelpKeeper. Connect with fellow divers dedicated to protecting and preserving these vital underwater ecosystems for generations to come.
            </FadeTypography>

            <FadeTypography show={showButton} timeout={1000} component="div">
              <Button 
                variant="contained" 
                size="large"
                onClick={() => directToLoginOrRegistrationPage(false)}
                sx={{ 
                  bgcolor: 'white',
                  color: 'black',
                  fontSize: { sm: '0.6rem', md: '1rem' },
                  borderRadius: 28,
                  display: 'block',
                  margin: 'auto',
                  px: 4,
                  '&:hover': {
                    bgcolor: 'black',
                    color: 'white'
                  }
                }}
              >
                Become a KelpKeeper
              </Button>
              <Typography variant='boy1' sx={{marginTop: '20px', display: 'block', color: 'white'}}>
                Already a KelpKeeper? <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => directToLoginOrRegistrationPage(true)}>Login</span> to your dashboard
              </Typography>
            </FadeTypography>
          </Grid>
        </Grid>

        
      </Container>
    </>
  )
}

export default HeroSection