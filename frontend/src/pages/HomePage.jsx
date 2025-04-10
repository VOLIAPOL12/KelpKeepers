import React from 'react'
import { 
  useTheme
} from '@mui/material';
import { Box } from '@mui/material';
import HeroSection from '../components/organisms/HeroSection';
import JourneySection from '../components/organisms/JourneySection';

import FadeTransition from '../components/molecules/FadeTransition';
import { useState, useEffect, useRef } from 'react';

function HomePage() {
  const theme = useTheme();
  // Hero section animation
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [darkOverlay, setDarkOverlay] = useState(false);
  const heroRef = useRef(null);

  // black background
  const [blackTransition, setBlackTransition] = useState(false);

  // trigger the start of the journey
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [showJourneyContent, setShowJourneyContent] = useState(false);


  // Originally for updating the hero section height based on the nav bar which is for iteration 2
  useEffect(() => {
    const updateHeight = () => {
      if (heroRef.current) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const windowHeight = window.innerHeight;
        heroRef.current.style.height = `${windowHeight - navbarHeight}px`;
      }
    };
    
    updateHeight();
    
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Animation for when moving into journey started phase
  useEffect(() => {
    const darkOverlayTimer = setTimeout(() => {
      setDarkOverlay(true);
    }, 800);

    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1000);

    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => {
      clearTimeout(darkOverlayTimer);
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, [journeyStarted]);

  // function to handle when user wants to start the journey
  const handleStartJourney = () => {
    setJourneyStarted(true);
    
    setBlackTransition(true);
    
    setTimeout(() => {
      setShowJourneyContent(true);
      setBlackTransition(false);
    }, 1500);
  };

  return (
    <Box 
      ref={heroRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FadeTransition show={blackTransition} />

      {!showJourneyContent && (
        <HeroSection
          showTitle={showTitle}
          showSubtitle={showSubtitle}
          showButton={showButton}
          darkOverlay={darkOverlay}
          onStartJourney={handleStartJourney}
        />
      )}

      {showJourneyContent && (
        <JourneySection
          journeyStarted={journeyStarted}
          showJourneyContent= {showJourneyContent}
        />
        )}
    </Box>
  )
}

export default HomePage