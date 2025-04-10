import React, { useState, useRef } from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import Slider from 'react-slick';

import img1 from '../assets/images/1.jpeg';
import img2 from '../assets/images/2.jpeg';
import img3 from '../assets/images/3.jpeg';
import img4 from '../assets/images/4.jpeg';
import img5 from '../assets/images/5.jpeg';
import img6 from '../assets/images/6.jpeg';
import img7 from '../assets/images/7.jpeg';
import img8 from '../assets/images/8.jpeg';
import img9 from '../assets/images/9.jpeg';
import img10 from '../assets/images/10.jpeg';
import img11 from '../assets/images/11.jpeg';
import img12 from '../assets/images/12.jpeg';
import img13 from '../assets/images/13.jpeg';


const ProcessOfDestruction = ({ cardDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSimulation, setIsSimulation] = useState(false);
  const simulationSliderRef = useRef(null);
  const [isSlider, setIsSlider] = useState(true);

  const handleToggle = () => {
    setIsSlider(!isSlider);
  }

  const simulationImages = [
    img1, img2, img3, img4, img5, img6, img7,
    img8, img9, img10, img11, img12, img13,
  ];

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

  return (
    <Box
        sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 3
        }}
    >
      {currentSlide !== 4 && !isSimulation && (
        <Box sx={{
          width: '100%',
          height: '8px',
          backgroundColor: '#f0f0f0',
          top: '10px',
          borderRadius: '50px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 1,
          marginBottom: '12px',
        }}>
          <Box sx={{
            width: `${(currentSlide / 3) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00bfae, #00796b)',
            borderRadius: '50px',
            transition: 'width 0.3s ease-in-out',
          }} />
        </Box>
      )}

      <Slider {...outerSliderSettings}>
        {cardDetails.descriptions.map((card, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              height: index === 4 ? 550 : 500,
              borderRadius: 1,
              overflow: 'hidden',
              p: 2,
              boxSizing: 'border-box',
            }}
          >
            <CardMedia
              component="img"
              image={cardDetails.image}
              alt={card.title}
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

            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'brightness(0.6)',
                borderRadius: 1,
                px: 3,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                  mb: 2,
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#fff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                  lineHeight: 1.6,
                  maxWidth: '85%',
                }}
              >
                {card.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProcessOfDestruction;
