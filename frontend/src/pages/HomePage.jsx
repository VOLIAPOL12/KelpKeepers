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
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [darkOverlay, setDarkOverlay] = useState(false);
  const heroRef = useRef(null);

  const [journeyStarted, setJourneyStarted] = useState(false);
  const [blackTransition, setBlackTransition] = useState(false);
  const [showJourneyContent, setShowJourneyContent] = useState(false);
  const [showJourneyText1, setShowJourneyText1] = useState(false);
  const [showJourneyText2, setShowJourneyText2] = useState(false);
  const [progressValue, setProgressValue] = useState(0)

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

  useEffect(() => {
    if (!journeyStarted || !showJourneyContent) return;
    
    const progressTimer = setInterval(() => {
      setProgressValue((prevValue) => {
        if (prevValue >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prevValue + 0.5;
      });
    }, 50);

    const text1Timer = setTimeout(() => {
      setShowJourneyText1(true);
    }, 1000);

    const text2Timer = setTimeout(() => {
      setShowJourneyText2(true);
    }, 2500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(text1Timer);
      clearTimeout(text2Timer);
    };
  }, [journeyStarted, showJourneyContent]);

  const handlePageComplete = () => {
    setProgressValue(100);
  };

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
        showText1={showJourneyText1}
        showText2={showJourneyText2}
        progressValue={progressValue}
        onPageComplete={handlePageComplete}
      />
      )}
    </Box>
  )
}

export default HomePage