import React, { useState } from "react";
import { Box } from '@mui/material';
import journey from "../../assets/journey.png";
import { hotspotData } from "../../assets/information.js";
import HotspotButton from "../molecules/HotspotButton";
import InfoDialog from "../molecules/InfoDialog";

function InteractiveBackground() {
  const [unlockedHotspots, setUnlockedHotspots] = useState(['kelp']);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  
  const handleHotspotClick = (hotspotId) => {
    if (unlockedHotspots.includes(hotspotId)) {
      const hotspot = hotspotData.find(h => h.id === hotspotId);
      setActiveHotspot(hotspot);
      setClickedPosition(hotspot.position);
      setOpenDialog(true);
      
      if (hotspotId === 'kelp' && unlockedHotspots.length === 1) {
        setUnlockedHotspots(hotspotData.map(h => h.id));
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getAccentColor = (id) => {
    switch(id) {
      case 'kelp':
      case 'kelp2':
        return '#4CAF50';
      case 'fish':
        return '#FFC107';
      case 'diver':
        return '#2196F3';
      case 'sunlight':
        return '#FF9800';
      default:
        return '#009688';
    }
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
          objectFit: 'cover',
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
          originPosition={clickedPosition}
        />
      )}
    </Box>
  );
}

export default InteractiveBackground;