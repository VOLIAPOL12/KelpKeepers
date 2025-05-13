import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip, Typography } from '@mui/material';
import journeyDesktop from "../assets/images/final-interactive-background.jpg";
import journeyMobile from "../assets/images/final-interactive-background-mobile.png";
import { hotspotData } from "../assets/information.js"; 
import HotspotButton from "../components/molecules/HotspotButton.jsx";
import logo from "../assets/logo.png";
import { GlobalStyles } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HotspotTooltip from "../components/molecules/HotspotTooltip.jsx";
import InfoDialogV2 from "../components/organisms/InfoDialogV2.jsx";

function ExplorePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const { setCurrentHotspot } = useHotspotStore();

  const handleHotspotClick = (hotspot) => {
    setCurrentHotspot(hotspot);
    setOpenDialog(true);
  };

  const [backgroundImage, setBackgroundImage] = useState(journeyDesktop);

  useEffect(() => {
    function handleResize() {
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        setBackgroundImage(journeyMobile);
      } else {
        setBackgroundImage(journeyDesktop);
      }
    }

    handleResize(); // set initially on load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoClick = () => {
    const logoHotspot = hotspotData.find(h => h.id === 'logo');

    setCurrentHotspot(logoHotspot);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      overflow: 'hidden',
      height: '100vh', // Fill full screen
    }}>
      <Box 
        component="img"
        src={backgroundImage}
        alt="Underwater kelp forest scene"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      
      <Box sx={{

        display: {md: 'block', xs: 'none'},
        position: 'absolute',
        top: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '24px',
        textAlign: 'center',
        maxWidth: '90%',
        zIndex: 23
      }}>
        Hover a tab to see more
      </Box>
      <Box sx={{
      display: {md: 'none', xs: 'block'},
      position: 'absolute',
      top: '70px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '24px',
      textAlign: 'center',
      maxWidth: '90%',
      zIndex: 23
      }}>
        Tap a tab to see more
      </Box>
      
      
      {hotspotData.map((hotspot) => (
        hotspot.id === "logo" ?
            <Box
                key={hotspot.id}
                sx={{
                  position: 'absolute',
                  ...hotspot.position,
                  color: '#fff',
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  width: {
                      xs: '25%',
                      sm: '24%',
                      md: '17%',
                      lg: '15%',
                  },
                  zIndex: 20,
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleLogoClick}
            >
              <img
                src={logo}
                alt="Milestone Logo"
                style={{
                    marginBottom: '16px',
                    filter: 'drop-shadow(0 0 10px gold) drop-shadow(0 0 20px goldenrod)',
                    animation: 'pulseGlow 2s infinite ease-in-out'
                }}
              />
            </Box>
            :
            <Tooltip
              arrow
              title={
                <Box sx={{textAlign: 'left'}}>
                  <Typography variant="body2" fontWeight="bold">
                    {hotspot.title}
                  </Typography>
                  <Typography variant="caption" sx={{display: 'block', mb: 2}}>
                    {hotspot.description}
                  </Typography>
                  <Button onClick={(e) => handleHotspotClick(hotspot, e)} sx={{bgcolor: 'black', color: 'white'}}>
                    Learn More
                  </Button>
                </Box>
              }
              enterTouchDelay={1}
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #ccc',
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    maxWidth: 300,
                  },
                },
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}
            >
              <Box
                variant="contained"
                sx={{
                  position: 'absolute',
                  ...hotspot.position,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#fff',
                  fontSize: { xs: '8px', md: '20px'},
                  color: '#000',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  fontFamily: "'Reggae One', cursive",
                  border: 4,
                  px: 4,
                  py: 2,
                }}
              >
                {hotspot.label}
              </Box>
            </Tooltip>
      ))}

      {/* Creating the information Dialog */}

      {activeHotspot && (
        <InfoDialogV2
          open={openDialog}
          onClose={handleCloseDialog}
          hotspot={activeHotspot}
        />
      )}

      <GlobalStyles styles={{
        '@keyframes pulseGlow': {
          '0%': {
            filter: 'drop-shadow(0 0 5px gold) drop-shadow(0 0 10px goldenrod)',
            transform: 'scale(1)'
          },
          '50%': {
            filter: 'drop-shadow(0 0 20px gold) drop-shadow(0 0 30px goldenrod)',
            transform: 'scale(1.1)'
          },
          '100%': {
            filter: 'drop-shadow(0 0 5px gold) drop-shadow(0 0 10px goldenrod)',
            transform: 'scale(1)'
          }
        }
      }} />
    </Box>
  );
}

export default ExplorePage;