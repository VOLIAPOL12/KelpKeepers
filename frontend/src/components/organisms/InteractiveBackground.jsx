import React from "react";
import { 
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    IconButton, 
    Typography
  } from '@mui/material';
  import { useState } from "react";
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import CloseIcon from '@mui/icons-material/Close';
  import jorney from "../../assets/journey.png"

  
  const hotspotData = [
    {
      id: 'kelp',
      position: { top: '60%', right: '22%' },
      title: 'Giant Kelp (Macrocystis pyrifera)',
      content: `
        Giant kelp is one of the fastest growing organisms on the planet, capable of growing up to 50cm per day under ideal conditions.
        
        These marine algae form underwater forests, creating one of the most productive and dynamic ecosystems on Earth. They provide habitat, food, and shelter for thousands of marine species.
        
        The Great Southern Reef around Australia has the world's largest continuous kelp forest stretching over 8,000 kilometers.
      `,
      unlocked: true,
    },
    {
      id: 'fish',
      position: { top: '60%', left: '22%' },
      title: 'Yellow Striped Fish',
      content: `
        These vibrant reef fish depend on kelp forests for shelter and hunting grounds. They form an essential part of the kelp forest ecosystem.
        
        Many species navigate through the kelp "pillars," using them as protection from larger predators. The complex habitat created by kelp supports incredible fish biodiversity.
        
        As kelp forests decline, fish populations that depend on them also decrease, affecting the entire marine food web.
      `,
      unlocked: false,
    },
    {
      id: 'diver',
      position: { top: '65%', left: '46%' },
      title: 'Scientific Diver',
      content: `
        Marine scientists and conservation divers regularly monitor kelp forests to track their health and biodiversity.
        
        These researchers document changes in kelp coverage, sea urchin populations, and the overall ecosystem health. Their data is critical for conservation efforts.
        
        Many conservation organizations also train volunteer divers to help with kelp forest monitoring and restoration efforts around Australia's coastline.
      `,
      unlocked: false,
    },
    {
      id: 'sunlight',
      position: { top: '10%', left: '45%', color: 'black' },
      title: 'Sunlight Penetration',
      content: `
        Sunlight is essential for kelp forests as these marine algae rely on photosynthesis for growth and survival.
        
        The clarity of water determines how deep kelp can grow, with most giant kelp forests thriving in depths of 6-30 meters where sufficient light can penetrate.
        
        Climate change and coastal runoff can reduce water clarity, limiting the depth at which kelp can grow and threatening deep kelp communities.
      `,
      unlocked: false,
    },
    {
      id: 'kelp2',
      position: { top: '40%', left: '13%' },
      title: 'Kelp Canopy',
      content: `
        The upper portions of giant kelp create a floating canopy at the water's surface, forming a unique habitat zone.
        
        This canopy reduces light penetration to deeper waters, creating different microhabitats at various depths within the kelp forest.
        
        The kelp canopy also helps to reduce wave energy, protecting coastlines from erosion during storms and providing calmer waters for many marine species.
      `,
      unlocked: false,
    }
  ];

function InteractiveBackground() {
    const [unlockedHotspots, setUnlockedHotspots] = useState(['kelp']);
    const [openDialog, setOpenDialog] = useState(false);
    const [activeHotspot, setActiveHotspot] = useState(null);
    
    const handleHotspotClick = (hotspotId) => {
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
              src={jorney}
              alt="Underwater kelp forest scene"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            
            {hotspotData.map((hotspot) => (
              <IconButton
                key={hotspot.id}
                onClick={() => handleHotspotClick(hotspot.id)}
                sx={{
                  position: 'absolute',
                  ...hotspot.position,
                  transform: 'translate(50%, -50%)',
                  backgroundColor: unlockedHotspots.includes(hotspot.id) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(100, 100, 100, 0.3)',
                  '&:hover': {
                    backgroundColor: unlockedHotspots.includes(hotspot.id) ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 100, 100, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  cursor: unlockedHotspots.includes(hotspot.id) ? 'pointer' : 'not-allowed',
                }}
              >
                <AddCircleOutlineIcon 
                  sx={{ 
                    color: unlockedHotspots.includes(hotspot.id) ? 'white' : 'gray',
                    fontSize: '2rem',
                  }} 
                />
              </IconButton>
            ))}
            
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              sx={{
                borderRadius: 10,
              }}
              maxWidth="sm"
              fullWidth
            >
              {activeHotspot && (
                <>
                  <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    {activeHotspot.title}
                    <IconButton
                      aria-label="close"
                      onClick={handleCloseDialog}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent dividers>
                    <Typography component="div">
                      {activeHotspot.content.split('\n\n').map((paragraph, index) => (
                        <Typography key={index} paragraph>
                          {paragraph}
                        </Typography>
                      ))}
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </>
              )}
            </Dialog>
          </Box>
    )
}

export default InteractiveBackground;