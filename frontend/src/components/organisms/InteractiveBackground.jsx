import React, { useEffect, useState } from "react";
import { Box } from '@mui/material';
import journey from "../../assets/journey.png";
import { hotspotData } from "../../assets/information.js";
import HotspotButton from "../molecules/HotspotButton";
import InfoDialog from "../molecules/InfoDialog";
import logo from "../../assets/logo.png";
import { GlobalStyles } from '@mui/material';

function InteractiveBackground() {
  const [unlockedHotspots, setUnlockedHotspots] = useState(['kelp']);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showLogo, setShowLogo] = useState(false);

  const [clickState, setClickState] = useState(
    hotspotData.map(h => ({
      id: h.id,
      clicked: false
    }))
  );

  useEffect(() => {
    const numClicked = clickState.filter(h => h.clicked).length;
    if (numClicked >= 3) {
      setShowLogo(true);
    }
  }, [clickState])

  
  const handleHotspotClick = (hotspotId) => {
    setClickState(prev =>
      prev.map(h =>
        h.id === hotspotId ? { ...h, clicked: true } : h
      )
    );

    if (unlockedHotspots.includes(hotspotId)) {
      const hotspot = hotspotData.find(h => h.id === hotspotId);
      setActiveHotspot(hotspot);
      setOpenDialog(true);
      
      if (hotspotId === 'kelp' && unlockedHotspots.length === 1) {
        setUnlockedHotspots(hotspotData.map(h => h.id));
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      <Box 
        component="img"
        src={journey}
        alt="Underwater kelp forest scene"
        sx={{
          width: '100%',
          height: '100%',
        }}
      />

      {unlockedHotspots.length === 1 && (
        <Box sx={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '24px',
          textAlign: 'center',
          maxWidth: '90%',
          zIndex: 20
        }}>
          Click the glowing + sign on the kelp to begin exploring
        </Box>
      )}
      
      {hotspotData.map((hotspot) => (
        <HotspotButton
          key={hotspot.id}
          position={hotspot.position}
          isUnlocked={unlockedHotspots.includes(hotspot.id)}
          onClick={() => handleHotspotClick(hotspot.id)}
          tooltip={hotspot.title}
        />
      ))}
      
      {activeHotspot && (
        <InfoDialog
          open={openDialog}
          onClose={handleCloseDialog}
          hotspot={activeHotspot}
        />
      )}

      {showLogo && (
        <>
          <Box sx={{
            position: 'absolute',
            top: "30%",
            left: '47%',
            transform: 'translateX(-50%)',
            color: '#fff',
            px: 3,
            py: 2,
            borderRadius: 2,
            zIndex: 20
          }}>
            <img
              src={logo}
              alt="Milestone Logo"
              style={{
                height: '160px',
                marginBottom: '16px',
                filter: 'drop-shadow(0 0 10px gold) drop-shadow(0 0 20px goldenrod)',
                animation: 'pulseGlow 2s infinite ease-in-out'
              }}
            />
          </Box>
        </>
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
      }}
      />
    </Box>
  );
}

export default InteractiveBackground;