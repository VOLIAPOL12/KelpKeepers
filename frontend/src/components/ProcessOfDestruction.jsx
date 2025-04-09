// ProcessOfDestruction.jsx
import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import Slider from 'react-slick';

const ProcessOfDestruction = () => {
  const sliderContent = [
    {
      title: "Rising sea temperatures",
      description: `Sea temperatures are rising worldwide with global warming. Tasmanian waters have warmed by 2°C over the past century, a rate three to four times the global average.`,
    },
    {
      title: "Booming urchin population",
      description: `Warmer waters have facilitated the southward migration and population explosion of the long spined sea urchin (Centrostephanus rodgersii), extending its range by over 650 km into Tasmanian waters.`,
    },
    {
      title: "Kelp deforestation",
      description: `These sea urchins overgraze on kelp, transforming lush forests into barren areas known as "urchin barrens." This has led to the loss of 95% of giant kelp forests along Tasmania's east coast.`,
    },
    {
      title: "Ecosystem collapse",
      description: `The destruction of kelp forests disrupts marine ecosystems, leading to declines in biodiversity and negatively impacting the endemic species that depend on these habitats.`,
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Slider {...settings}>
        {sliderContent.map((item, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100%' }}>
            <CardMedia
              component="img"
              image="frontend/src/assets/images/sky-high-seaweed.jpg"
              alt={item.title}
              sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 3 }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', fontSize: '1.1rem', lineHeight: 1.6, textAlign: 'center' }}>
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProcessOfDestruction;
