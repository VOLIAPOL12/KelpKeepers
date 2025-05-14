import { useState } from 'react';
import {
  Box,
  IconButton,
  Fade
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function SliderSection({ section }) {
  const [index, setIndex] = useState(0);
  const slides = section.descriptions || [];

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const currentSlide = slides[index];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {/* Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      {/* Slide Content */}
      <Fade in>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: 400,
            backgroundImage: `url(${section.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: 2,
            py: 3,
            boxSizing: 'border-box',
            color: 'white',
            overflow: 'hidden',
          }}
        >
          {/* Overlay to darken the image */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              zIndex: 0,
            }}
          />

          {/* Text content directly on top of darkened background */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              {currentSlide.title}
            </Box>
            <Box
              sx={{
                fontSize: '1rem',
                lineHeight: 1.7,
                pr: { xs: 1, md: '10%' }, // optional right margin for aesthetics
              }}
            >
              {currentSlide.description}
            </Box>
          </Box>
        </Box>
      </Fade>
      {/* Dot Indicators */}
      <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: i === index ? '#1a93ca' : '#ccc',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default SliderSection;
