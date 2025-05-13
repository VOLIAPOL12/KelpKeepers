import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

function SliderSection({ section }) {
  const [index, setIndex] = useState(0);
  const slides = section.descriptions || [];

  console.log(section);

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[index];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        boxSizing: 'border-box',
      }}
    >
      {/* Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Content */}
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
          {currentSlide.title}
        </Box>
        <Box sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
          {currentSlide.description}
        </Box>
      </Box>
    </Box>
  );
}

export default SliderSection;