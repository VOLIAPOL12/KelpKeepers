import React from 'react'
import { Box } from '@mui/material';
import HeroSection from '../components/organisms/HeroSection';
import FadeTransition from '../components/molecules/FadeTransition';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useHeightAdjustment from '../components/hooks/useHeightAdjustment';

function HomePage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [darkOverlay, setDarkOverlay] = useState(false);

  const [blackTransition, setBlackTransition] = useState(false);
  const [showJourneyContent, setShowJourneyContent] = useState(false);

  const handleStartJourney = (isSkipped) => {
    setBlackTransition(true);
    setTimeout(() => {
      setShowJourneyContent(true);
      setBlackTransition(false);
      navigate(isSkipped ? '/explore' : '/journey');
    }, 1500);
  };

  useHeightAdjustment(heroRef);

  useEffect(() => {
    const timers = [
      setTimeout(() => setDarkOverlay(true), 300),
      setTimeout(() => setShowTitle(true), 500),
      setTimeout(() => setShowSubtitle(true), 1000),
      setTimeout(() => setShowButton(true), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

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
    </Box>
  )
}

export default HomePage