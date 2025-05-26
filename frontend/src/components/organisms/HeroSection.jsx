import React from 'react';
import { Button, Container, Fade, Grid, Typography, Tooltip, Box } from '@mui/material';
import FadeTypography from '../atoms/FadeTypography';
import VideoBackground from '../molecules/VideoBackground';
import { useNavigate } from 'react-router-dom';

// Importing GIFs
import communityGif from "../../assets/images/community.gif";
import dashboardGif from "../../assets/images/dashboard.gif";
import statsGif from "../../assets/images/statistics.gif";
import dataGif from "../../assets/images/data.gif"; 


function HeroSection({ 
    showTitle, 
    showSubtitle, 
    showButton, 
    darkOverlay, 
    onStartJourney,
}) {
  const navigate = useNavigate();
  const directToLoginOrRegistrationPage = (login) => {
    navigate('/login', { state: { login: login } });
  };

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
              pr: { md: 4 },
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

              <FadeTypography show={showButton} timeout={1000} component="div" sx={{ textAlign: 'center' }}>
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
                <Typography variant="body1" sx={{ marginTop: '20px', display: 'block', color: 'white' }}>
                  been here before? Skip to the <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onStartJourney(true)}>Main Module</span>
                </Typography>
              </FadeTypography>
            </Grid>
          </Fade>

          <Grid item xs={12} md={6}>
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
              <Tooltip
                title={
                  <Box sx={{ padding: 2, maxWidth: 400 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
                      Benefits of Joining:
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                      <img src={communityGif} alt="movement" width={48} height={48} />
                      <Typography fontSize="1rem" color="black">
                        <strong>Be Part of a Movement</strong><br />
                        Connect with passionate divers restoring marine life. Take part in exclusive urchin removal events and help kelp forests thrive.
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                      <img src={dashboardGif} alt="dashboard" width={48} height={48} />
                      <Typography fontSize="1rem" color="black">
                        <strong>Your Personal Hub</strong><br />
                        Track your restoration journey and host your own eco-events.
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                      <img src={statsGif} alt="impact" width={48} height={48} />
                      <Typography fontSize="1rem" color="black">
                        <strong>Measure Your Impact</strong><br />
                        See how your contributions stack up against others in the community.
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <img src={dataGif} alt="research" width={48} height={48} />
                      <Typography fontSize="1rem" color="black">
                        <strong>Fuel the Future</strong><br />
                        Share your findings and support vital ecological research.
                      </Typography>
                    </Box>
                  </Box>
                }
                arrow
                placement="top"
                enterDelay={200}
                leaveDelay={200}
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: 'rgba(255, 255, 255, 0.65)', // translucent white
                      color: 'black',
                      backdropFilter: 'blur(10px)', // frosted effect
                      WebkitBackdropFilter: 'blur(10px)', // for Safari support
                      borderRadius: 3,
                      boxShadow: 6,
                      padding: 2,
                      fontSize: '1rem',
                      textAlign: 'left',
                      maxWidth: '420px',
                      width: '100%',
                    },
                  },
                }}
              >
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
              </Tooltip>
              <Typography variant="body1" sx={{ marginTop: '20px', display: 'block', color: 'white' }}>
                Already a KelpKeeper? <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => directToLoginOrRegistrationPage(true)}>Login</span> to your dashboard
              </Typography>
            </FadeTypography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HeroSection;
