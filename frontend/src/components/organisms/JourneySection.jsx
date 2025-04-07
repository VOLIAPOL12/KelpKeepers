// components/organisms/JourneySection.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import FadeTypography from '../atoms/FadeTypography';
import ProgressBar from '../atoms/ProgressBar';
import BouncingArrow from '../atoms/BouncingArrow';
import jorney from "../../assets/journey.png"
import { useEffect, useState } from 'react';

function JourneySection({ showText1, showText2, progressValue,
    onPageComplete  }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [showDangerText1, setShowDangerText1] = useState(false);
    const [showDangerText2, setShowDangerText2] = useState(false);

    useEffect(() => {
        if (progressValue >= 100 && currentPage === 1) {
          setCurrentPage(2);
          
          setTimeout(() => setShowDangerText1(true), 1000);
          setTimeout(() => setShowDangerText2(true), 2500);
        }
      }, [progressValue, currentPage]);
    
      const handleArrowClick = () => {
        if (currentPage === 1 && progressValue < 100) {
          onPageComplete();
        } else if (currentPage === 1) {
          setCurrentPage(2);
          
          setTimeout(() => setShowDangerText1(true), 1000);
          setTimeout(() => setShowDangerText2(true), 2500);
        }
      };
    return (
    <Box sx={{
      position: 'relative',
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    }}>
      {currentPage === 1 && (
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
      )}

{currentPage === 2 && (
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
    )}

      {currentPage === 1 && (
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
            show={showText1}
            timeout={1000}
            variant="h4" 
            component="h2" 
            sx={{ 
              color: 'white', 
              maxWidth: 800,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontWeight: 500
            }}
          >
            Hidden beneath the waves, Southern Australia's giant kelp forests are more than just marine ecosystems. They are the lifeblood of coastal communities, supporting local fisheries, tourism, and recreation industries worth over $10 billion.
          </FadeTypography>

          <FadeTypography 
            show={showText2}
            timeout={1000}
            variant="h5" 
            component="p" 
            sx={{ 
              color: 'white', 
              mb: 6,
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              fontWeight: 500
            }}
          >
            Many Australians don't even know they exist!
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 2,
            p: 4,
            mb: 4,
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
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                fontWeight: 500,
                fontSize: {xs: '1rem', md: '2rem'},
                
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
              fontSize: '1.8rem'
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
            <BouncingArrow />
          </Box>
        </Container>
      )}
    </Box>
  );
}

export default JourneySection;