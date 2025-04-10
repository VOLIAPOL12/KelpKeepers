import React, { useRef, useState } from 'react'
import { Box, Typography, CardMedia } from '@mui/material'
import Slider from 'react-slick';


function Restoration({simulationData}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const simulationSliderRef = useRef(null);
  const simulationImages = simulationData.simulationImages;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>{simulationData.title}</Typography>
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
          <Box key={idx}>
            <CardMedia
              component="img"
              image={img.image}
              alt={`Image ${idx + 1}`}
              sx={{
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                {img.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  margin: 'auto',
                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                  lineHeight: 1.6, 
                  maxWidth: '85%',
                }}
              >
                {img.description}
              </Typography>
          </Box>
        ))}
      </Slider>

      <Box sx={{ width: '80%', mt: 3, mx: 'auto' }}>
        <input
          type="range"
          min={0}
          max={simulationImages.length - 1}
          value={currentSlide}
          onChange={(e) => {
            const index = Number(e.target.value);
            setCurrentSlide(index);
            simulationSliderRef.current.slickGoTo(index);
          }}
          style={{ width: '100%' }}
        />
      </Box>
    </Box>
  )
}

export default Restoration