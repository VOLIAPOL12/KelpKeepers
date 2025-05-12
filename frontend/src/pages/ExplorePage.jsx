import React, { useEffect, useState } from "react";
import { Box } from '@mui/material';
import journeyDesktop from "../assets/images/final-interactive-background.jpg";
import journeyMobile from "../assets/images/final-interactive-background-mobile.png";
import { hotspotData } from "../assets/information.js"; 
import HotspotButton from "../components/molecules/HotspotButton.jsx";
import InfoDialog from "../components/molecules/InfoDialog.jsx";
import logo from "../assets/logo.png";
import { GlobalStyles } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HotspotTooltip from "../components/molecules/HotspotTooltip.jsx";

function ExplorePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const navigate = useNavigate();

  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleHotspotClick = (hotspot, event) => {
    if (selectedHotspot?.id === hotspot.id) {
      setSelectedHotspot(null);
      setAnchorEl(null);
    } else {
      setSelectedHotspot(hotspot);
      setAnchorEl(event.currentTarget);
    }
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

    setActiveHotspot(logoHotspot);
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
        Click a button to show information
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
            <HotspotButton
              position={hotspot.position}
              onClick={(e) => handleHotspotClick(hotspot, e)}
              label={hotspot.label}
            />
      ))}
      
      <HotspotTooltip
        anchorEl={anchorEl}
        title={selectedHotspot?.label}
        description={selectedHotspot?.description} // this should be ~2 paragraphs
        onReadMore={() => {
          setActiveHotspot(selectedHotspot);
          setOpenDialog(true);
          setSelectedHotspot(null);
          setAnchorEl(null);
        }}
        onClose={() => {
          setAnchorEl(null);
          setSelectedHotspot(null);
        }}
      />

      {activeHotspot && (
        <InfoDialog
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
