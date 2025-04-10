import React, { useState, useRef } from 'react';
import { Box, Typography, CardMedia, LinearProgress, Card } from '@mui/material';
import Slider from 'react-slick';

const ProcessOfDestruction = ({ cardDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSimulation, setIsSimulation] = useState(false);
  const [isSlider, setIsSlider] = useState(true);

  const handleToggle = () => {
    setIsSlider(!isSlider);
  }

  const outerSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipe: false,
  
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  // Calculate progress percentage based on current slide and total slides
  const totalSlides = cardDetails.descriptions ? cardDetails.descriptions.length : 4;
  const progress = (currentSlide / (totalSlides - 1)) * 100;

  return (
    <Box
        sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 3,
            position: 'relative',
            height: 550,
            borderRadius: 1,
            overflow: 'hidden'
        }}
    >
      {/* Fixed background image that doesn't change with the slider */}
      <CardMedia
        component="img"
        image={cardDetails.image}
        alt="Background"
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          borderRadius: 1,
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          backdropFilter: 'brightness(0.6)',
          borderRadius: 1,
        }}
      />

      {/* MUI Linear Progress bar */}

        <Box sx={{
          width: '100%',
          zIndex: 2,
          marginBottom: '20px',
          position: 'relative'
        }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{
              height: 8,
              borderRadius: 4,
              margin: 'auto',
              width: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#00bfae',
                borderRadius: 4,
              }
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#fff',
              textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              mt: 2,
              mb: 20,
            }}
          >
            {cardDetails.title}
          </Typography>
      </Box>

      {/* Slider for the text content only */}
      <Box sx={{ zIndex: 2, position: 'relative', height: '100%' }}>
        <Slider {...outerSliderSettings}>
          {cardDetails.descriptions.map((card, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                height: index === 4 ? 500 : 450,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                textAlign: 'center',
                
              }}
            >
              <Card
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  width: '60%',
                  margin: 'auto',
                  p: 10,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    margin: 'auto',
                    lineHeight: 1.6, 
                    maxWidth: '85%',
                  }}
                >
                  {card.description}
                </Typography>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ProcessOfDestruction;