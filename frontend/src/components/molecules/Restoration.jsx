import React, { useRef, useState } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import Slider from 'react-slick';

function Restoration({ simulationData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const simulationSliderRef = useRef(null);
  const simulationImages = simulationData.simulationImages;

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Slider
        ref={simulationSliderRef}
        infinite={false}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        dots={false}
        beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
        afterChange={(index) => setCurrentSlide(index)}
      >
        {simulationImages.map((img, idx) => (
          <Box 
            key={idx}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 2,
            }}
          >
            {/* Title above the image */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                marginBottom: 2,
                textAlign: 'center',
              }}
            >
              {img.Title}
            </Typography>

            {/* The Image */}
            <CardMedia
              component="img"
              image={img.image}
              alt={img.Title}
              sx={{
                width: 'auto',
                maxWidth: '100%',
                height: 'auto',
                maxHeight: 'calc(100vh - 250px)',
                objectFit: 'contain',
                marginX: 'auto',
                borderRadius: 2,
              }}
            />

            {/* Description below the image */}
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                marginBottom: 4,
                marginX: 'auto',
                textAlign: 'center',
                maxWidth: '85%',
              }}
            >
              {img.Description}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Restoration;
