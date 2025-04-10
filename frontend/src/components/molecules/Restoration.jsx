import React from 'react'
import { Box, CardMedia } from '@mui/material'
import Slider from 'react-slick';

function Restoration() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>

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
              image={img}
              alt={`Image ${idx + 1}`}
              sx={{
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Box>
        ))}
      </Slider>

      <Box>


      </Box>

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