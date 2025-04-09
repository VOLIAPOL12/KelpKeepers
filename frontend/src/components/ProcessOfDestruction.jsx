import React from 'react';
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
    },
    {
      title: "Simulation",  
      description: (
        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
          {[
            img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13
          ].map((img, index) => (
            <Box key={index}>
              <CardMedia
                component="img"
                image={img}  
                alt={`Image ${index + 1}`}
                sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Slider>
      ),  
    },
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
            <Box sx={{ padding: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {item.title}
              </Typography>
              <Box>
                {item.description}  {}
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProcessOfDestruction;
