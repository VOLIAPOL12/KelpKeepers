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
import image10 from '../assets/images/process-of-destruction.jpg';

const ProcessOfDestruction = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSimulation, setIsSimulation] = useState(false); // 新增isSimulation状态
  const simulationSliderRef = useRef(null);

  const sliderContent = [
    {
      title: "Rising sea temperatures",
      image: image10,
      description: `Sea temperatures are rising worldwide with global warming. Tasmanian waters have warmed by 2°C over the past century, a rate three to four times the global average.`,
    },
    {
      title: "Booming urchin population",
      image: image10,
      description: `Warmer waters have facilitated the southward migration and population explosion of the long spined sea urchin (Centrostephanus rodgersii), extending its range by over 650 km into Tasmanian waters.`,
    },
    {
      title: "Kelp deforestation",
      image: image10,
      description: `These sea urchins overgraze on kelp, transforming lush forests into barren areas known as "urchin barrens." This has led to the loss of 95% of giant kelp forests along Tasmania's east coast.`,
    },
    {
      title: "Ecosystem collapse",
      image: image10,
      description: `The destruction of kelp forests disrupts marine ecosystems, leading to declines in biodiversity and negatively impacting the endemic species that depend on these habitats.`,
    },
    {
      title: "Simulation",
    },
  ];

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
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
      setIsSimulation(newIndex === 4); // 当切换到Simulation页面时，设置isSimulation为true
    },
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      {/* 仅在当前幻灯片不是Simulation页面时显示进度条 */}
      {currentSlide !== 4 && !isSimulation && (
        <Box sx={{
          width: '100%',
          height: '8px',
          backgroundColor: '#f0f0f0',
          position: 'absolute',
          top: '10px',
          borderRadius: '50px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 1,
          padding: '0 10px',
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
        {sliderContent.map((card, index) => (
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
            {card.title === "Simulation" ? (
              <Box sx={{ width: '100%', height: '100%' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>{card.title}</Typography>

                {/* 内部图片轮播 */}
                <Slider
                  ref={simulationSliderRef}
                  infinite={false}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  arrows={false}
                  dots={true}
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
                          height: '400px',
                          objectFit: 'cover',
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  ))}
                </Slider>

                {/* 进度条控制器 */}
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
            ) : (
              <>
                {/* 背景图层 */}
                <CardMedia
                  component="img"
                  image={card.image}
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

                {/* 叠加内容层 */}
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
                    borderRadius: '20px',
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
              </>
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProcessOfDestruction;
