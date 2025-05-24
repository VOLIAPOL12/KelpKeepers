import React from "react";

import SliderSection from "../molecules/SliderSection";
import { Box, Card, Typography } from "@mui/material";
import InfoGraphSection from "../molecules/InfoGraphSection";
import SpeciesMap from "../SpeciesMap";
import Restoration from "../molecules/Restoration";

const SectionContentRenderer = ({ section }) => {
    switch (section.type) {
      case 'slider':
        return <SliderSection section={section} />;
      case 'info-graph':
        return (
          <Box
            sx={{
            height: '80vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
        >
            <Typography 
              variant="h5" 
              sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  mt:2,
                  mb: 2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
              }}
            >
            {section.title} Visualization
            </Typography>

            
            <Box sx={{ height: '100%', width: '100%' }}>
            {/* {selectedCard.title === "Sea Star" && <SeastarMap />}
            {selectedCard.title === "Leafy Seadragon" && <SeadragonMap />}
            {selectedCard.title === "Spotted Handfish" && <HandfishMap />}
            {selectedCard.title === "Abalone" && <AbaloneMap />}
            {selectedCard.title === "Rapid Population Expansion" && <SeaUrchinMap />}
            {selectedCard.title === "Great Southern Reef" && <KelpMap />} */}
            {section.title === "Dive Sites" && <SpeciesMap species="Dive Sites" />}
            <SpeciesMap species={section.title} />
            </Box>
          </Box>
        )
      case 'simulation':
        return <Restoration simulationData={section}/>
      case 'video':
        return (
          <Card>
              <h3>{section.title}</h3>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                      src={section.videoUrl}
                      title={section.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '80%',
                          height: '80%',
                      }}
                  />
              </div>
          </Card>
        )
      default:
        return (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${section.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                borderRadius: 3,
                padding: 4,
                maxWidth: 600,
                textAlign: 'center',
              }}
            >
              <Box sx={{ fontWeight: 'bold', fontSize: '1.4rem', mb: 2 }}>
                {section.title}
              </Box>
              <Box sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                {section.description}
              </Box>
            </Box>
          </Box>
        );
    }
}
  
export default SectionContentRenderer;