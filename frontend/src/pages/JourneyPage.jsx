import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Fade, Container } from '@mui/material';
import jorney from "../assets/journey.png"
import ProgressBar from "../components/atoms/ProgressBar"
import BouncingArrow from '../components/atoms/BouncingArrow';
import FadeTypography from '../components/atoms/FadeTypography';
import useHeightAdjustment from '../components/hooks/useHeightAdjustment';
import useOrientation from '../components/hooks/useOrientation';


function JourneyPage() {
    const heroRef = useRef(null);
    const [progressValue, setProgressValue] = useState(0);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [showDangerText1, setShowDangerText1] = useState(false);
    const [showDangerText2, setShowDangerText2] = useState(false);

    const [fadingOut, setFadingOut] = useState(false);
    const [visiblePage, setVisiblePage] = useState(1);

    const [showJourneyText1, setShowJourneyText1] = useState(false);
    const [showJourneyText2, setShowJourneyText2] = useState(false);

    const orientation = useOrientation();

    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgressValue((preValue) => {
                if(preValue >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return preValue + 0.125;
            })
        }, 50);

        const timers = [
            setTimeout(() => setShowJourneyText1(true), 1000),
            setTimeout(() => setShowJourneyText2(true), 2500),
        ]

        return () => timers.forEach(clearTimeout);
    }, []);

    useHeightAdjustment(heroRef);

    useEffect(() => {
        if(progressValue >= 100) {
            if (currentPage === 1) {
                handlePageTransition(2);
                setProgressValue(0);
            } else if (currentPage === 2) {
                handlePageTransition(3);
            }
        }
    })

    const handleArrowClick = () => {
        if (currentPage === 1) {
            handlePageTransition(2);
            setProgressValue(0);
        } else if (currentPage === 2) {
            handlePageTransition(3);
        }
    }

    const handlePageTransition = (nextPage) => {
        setFadingOut(true);
        setTimeout(() => {
            setCurrentPage(nextPage);
            setVisiblePage(nextPage);
            setFadingOut(false);
            
            if (nextPage === 2) {
                setTimeout(() => setShowDangerText1(true), 500);
                setTimeout(() => setShowDangerText2(true), 2000);
            }
            
            if (nextPage === 3) {
                navigate('/explore');
            }
        }, 1000);
    };

    return (
        <Box
            ref={heroRef}
            sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                overflow: 'hidden'
          }}>
            {visiblePage === 1 && (
              <Fade in={!fadingOut} timeout={1000}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                  }
                }}>
                </Box>
              </Fade>
            )}
      
            {visiblePage === 2 && (
              <Fade in={!fadingOut} timeout={1000}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }
                }}>
                  <img
                    src={jorney}
                    alt="Kelp forest in danger"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </Box>
              </Fade>
            )}
      
            {visiblePage === 1 && (
              <Fade in={!fadingOut} timeout={1000}>
                    <Container maxWidth="md" sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <FadeTypography 
                            show={showJourneyText1}
                            timeout={1000}
                            variant="h4" 
                            component="h2" 
                            sx={{ 
                                color: 'white', 
                                maxWidth: 800,
                                mb: 3,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                fontWeight: 500,
                                fontSize: { xs: '20px', md: '30px'}
                            }}
                        >
                            Hidden beneath the waves, Southern Australia's giant kelp forests are more than just marine ecosystems. They are the lifeblood of coastal
                            communities, supporting local fisheries, tourism, and recreation industries worth over $10 billion.
                        </FadeTypography>
        
                        <FadeTypography 
                            show={showJourneyText2}
                            timeout={1000}
                            variant="h5" 
                            component="p" 
                            sx={{ 
                                color: 'white', 
                                mb: 6,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                fontWeight: 500,
                                fontSize: { xs: '24px', md: '45px'}
                            }}
                        >
                            Many Australians don't even know they exist!
                        </FadeTypography>
        
                        {/* Scroll indicator at bottom */}
                        <Box sx={{ 
                            position: 'absolute', 
                            bottom: 40, 
                            left: 0, 
                            right: 0, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center' 
                        }}>
                            <Box onClick={handleArrowClick} sx={{ cursor: 'pointer' }}>
                            <BouncingArrow />
                            </Box>
                        </Box>
        
                        {/* Progress bar at bottom */}
                        <Box sx={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            left: 0, 
                            width: '100%' 
                        }}>
                            <ProgressBar value={progressValue} />
                        </Box>
                    </Container>
                </Fade>
                )}
        
        
                {currentPage === 2 && (
                    <Container maxWidth="md" sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <Box sx={{
                        borderRadius: 2,
                        p: 4,
                        maxWidth: '90%'
                        }}>
                        <FadeTypography 
                            show={showDangerText1}
                            timeout={1000}
                            variant="h4" 
                            component="div" 
                            sx={{ 
                                color: 'white', 
                                maxWidth: 800,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                fontWeight: 500,
                                fontSize: { xs: '20px', md: '30px'}
                            }}
                        >
                            Unfortunately these underwater jungles are vanishing. As ocean temperatures rise, a silent invasion is taking place. Sea urchins, once balanced by nature, are now exploding in number tearing apart these ecosystems.
                        </FadeTypography>
                        </Box>
            
                        <FadeTypography 
                            show={showDangerText2}
                            timeout={1000}
                            variant="h5" 
                            component="p" 
                            sx={{ 
                                color: 'white', 
                                mb: 6,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                fontWeight: 700,
                                fontSize: { xs: '24px', md: '45px'}
                            }}
                        >
                        The damage is swift, and the consequences are enormous!
                        </FadeTypography>
            
                        <Box sx={{ 
                            position: 'absolute', 
                            bottom: 40, 
                            left: 0, 
                            right: 0, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center' 
                        }}>
                        <Box onClick={handleArrowClick} sx={{ cursor: 'pointer' }}>
                            <BouncingArrow />
                        </Box>
                    </Box>
                    <Box sx={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        width: '100%' 
                    }}>
                        <ProgressBar value={progressValue} />
                    </Box>
                </Container>
            )}
        </Box>
    )
}

export default JourneyPage