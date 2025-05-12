import React from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import ProcessOfDestruction from '../ProcessOfDestruction';
import Restoration from './Restoration';
import SeastarMap from '../SeastarMap';
import SeadragonMap from '../SeadragonMap';
import HandfishMap from '../HandfishMap';
import AbaloneMap from '../AbaloneMap';
import SeaUrchinMap from '../SeaUrchinMap';
import KelpMap from '../KelpMap';


const SectionContentRenderer = ({ section }) => {
  if (!section) return null;

  switch (section.type) {
    case 'info':
      return (
        <Box sx={{ textAlign: 'center'}}>
          <CardMedia
            component="img"
            image={section.image}
            alt={section.title}
            sx={{
              maxWidth: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              mb: 3,
              borderRadius: 2,
            }}
          />
          <Typography variant="h5" gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body1">{section.description}</Typography>
        </Box>
      );

    case 'slider':
      return <ProcessOfDestruction cardDetails={section} />;

    case 'simulation':
      return <Restoration simulationData={section} />;

    case 'info-graph':
      return (
        <Box sx={{ height: '80vh', p: 2 }}>
          <Typography variant="h5" align="center" sx={{ mb: 2, color: 'white' }}>
            {section.title} Visualization
          </Typography>
          {section.title === 'Sea Star' && <SeastarMap />}
          {section.title === 'Leafy Seadragon' && <SeadragonMap />}
          {section.title === 'Spotted Handfish' && <HandfishMap />}
          {section.title === 'Abalone' && <AbaloneMap />}
          {section.title === 'Rapid Population Expansion' && <SeaUrchinMap />}
          {section.title === 'Great Southern Reef' && <KelpMap />}
        </Box>
      );

    case 'video':
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            {section.title}
          </Typography>
          <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
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
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}
            />
          </Box>
        </Box>
      );

    default:
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Unsupported content type</Typography>
        </Box>
      );
  }
};

export default SectionContentRenderer;
