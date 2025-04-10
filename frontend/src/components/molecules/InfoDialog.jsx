import React, { useState, useEffect } from 'react';
import { 
    Dialog, 
    DialogContent, 
    IconButton, 
    Typography, 
    Box,
    Fade,
    Grid,
    Card,
    CardMedia,
    Button,
    Grow
  } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from '@mui/system'; 
import ProcessOfDestruction from '../ProcessOfDestruction';  
import SeastarMap from '../SeastarMap';
import SeadragonMap from '../SeadragonMap';
import HandfishMap from '../HandfishMap';
import AbaloneMap from '../AbaloneMap';
import SeaUrchinMap from '../SeaUrchinMap';
import KelpMap from '../KelpMap';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseButton from '../atoms/CloseButton';
import Restoration from './Restoration';

const GrowFromOrigin = React.forwardRef(function GrowFromOrigin(props, ref) {
    const { originPosition, ...other } = props;
    
    return (
        <Grow 
            ref={ref} 
            {...other}
            style={{
                transformOrigin: originPosition || 'center center',
            }}
        />
    );
});
const CustomSlider = styled(Slider)({
    '& .slick-prev, & .slick-next': {
      color: 'red',
      fontSize: '30px',
    },
  });

function InfoDialog({ open, onClose, hotspot, originPosition, onCardClick }) {
    const [showTitle, setShowTitle] = useState(true);
    const [showCards, setShowCards] = useState(false);
    const [titlePosition, setTitlePosition] = useState('center');
    const [selectedCard, setSelectedCard] = useState(null);

    // Early return if no hotspot
    if (!hotspot) return null;

    useEffect(() => {
        if (open) {
            setShowTitle(true);
            setShowCards(false);
            setTitlePosition('center');
            
            const cardsTimer = setTimeout(() => {
                setTitlePosition('top');
                setTimeout(() => {
                    setShowCards(true);
                }, 300);
            }, 1000);
            
            return () => clearTimeout(cardsTimer);
        } else {
            const resetTimer = setTimeout(() => {
                setShowTitle(true);
                setShowCards(false);
                setTitlePosition('center');
                setSelectedCard(null);
            }, 300);
            
            return () => clearTimeout(resetTimer);
        }
    }, [open]);

    const getCardStyle = (type) => {
        switch(type) {
            case 'info-graph':
                return { 
                    border: '1px solid #42a5f5',
                    '&:hover': { boxShadow: '0 0 8px #42a5f5' } 
                };
            case 'slider':
                return { 
                    border: '1px solid #9c27b0',
                    '&:hover': { boxShadow: '0 0 8px #9c27b0' } 
                };
            default:
                return {};
        }
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleBackClick = () => {
        setSelectedCard(null);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullWidth            
            slots={{ transition: GrowFromOrigin}}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    maxWidth: '95vw',
                    bgcolor: 'rgba(245, 245, 245, 0.95)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    border: '4px solid #1a93ca',
                    height: 'auto',
                    maxHeight: '100vh',
                }
            }}
        >
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'gray.500',
                    zIndex: 10
                }}
            >
                <CloseButton />
            </IconButton>

            <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
            {!selectedCard ? (
                // Main dialog with cards view
                <>
                    <Box sx={{ 
                        textAlign: 'center',
                        py: titlePosition === 'center' ? 10 : 2,
                        transition: 'padding 0.5s ease-in-out',
                        backgroundColor: 'transparent'
                    }}>
                        <Typography 
                            variant="h2" 
                            component="h1"
                            sx={{ 
                                fontFamily: "'Reggae One', cursive",
                                fontWeight: 'bold',
                                fontSize: titlePosition === 'center' ? '3.5rem' : '2rem',
                                transition: 'font-size 0.5s ease-in-out',
                                color: '#333'
                            }}
                        >
                            {hotspot.title}
                        </Typography>
                    </Box>

                    <Fade in={showCards} timeout={800}>
                        {hotspot.dialogType === "cards" ? (
                            <Box sx={{ px: 4, pb: 10 }}>
                                <Grid container spacing={2}>
                                    {hotspot.content && hotspot.content.map((card) => (
                                        <Grid 
                                            item 
                                            size={{
                                                xs: hotspot.layout?.xs || 12,
                                                sm: hotspot.layout?.sm || 6,
                                                md: hotspot.layout?.md || 3
                                            }}
                                            key={card.id}
                                        >
                                            

                                            <Card 
                                                onClick={() => handleCardClick(card)}    
                                                sx={{ 
                                                cursor: 'pointer',
                                                position: 'relative',
                                                borderRadius: '20px',
                                                height: 200,
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.03)',
                                                },
                                                ...getCardStyle(card.type)
                                                }}
                                            >
                                                {/* Image as background layer */}
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
                                                    borderRadius: 1
                                                }}
                                                />

                                                {/* Overlay content */}
                                                <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    height: '100%',
                                                    width: '100%',
                                                    zIndex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backdropFilter: 'brightness(0.6)',
                                                    borderRadius: '20px',
                                                    px: 1
                                                }}
                                                >
                                                <Typography 
                                                    variant="subtitle1" 
                                                    align="center"
                                                    sx={{ 
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    textShadow: '0 1px 3px rgba(0,0,0,0.7)'
                                                    }}
                                                >
                                                    {card.title}
                                                </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ): (
                            <>
                    <Box sx={{ 
                        textAlign: 'center',
                        py: titlePosition === 'center' ? 10 : 2,
                        transition: 'padding 0.5s ease-in-out',
                        backgroundColor: 'transparent'
                    }}>
                        <Typography 
                            variant="h2" 
                            component="h1"
                            sx={{ 
                                fontFamily: "'Reggae One', cursive",
                                fontWeight: 'bold',
                                fontSize: titlePosition === 'center' ? '3.5rem' : '2rem',
                                transition: 'font-size 0.5s ease-in-out',
                                color: '#333'
                            }}
                        >
                            {hotspot.title || "BATTLE TO REVIVE KELP"}
                        </Typography>
                    </Box>

                    <Fade in={showCards} timeout={800}>
                        <Box sx={{ px: 4, pb: 10 }}>
                            <Grid container spacing={4}>
                                {/* Left Column - Cards */}
                                <Grid item xs={12} md={3}>
                                    {hotspot.content.map((card, index) => (
                                        <Card 
                                            key={card.id || index}
                                            onClick={() => handleCardClick(card)}    
                                            sx={{ 
                                                cursor: 'pointer',
                                                position: 'relative',
                                                borderRadius: '20px',
                                                height: '200px',
                                                marginBottom: index < hotspot.content.length - 1 ? 3 : 0,
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.03)',
                                                },
                                                ...getCardStyle(card.type)
                                            }}
                                        >
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
                                                    borderRadius: '20px'
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
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backdropFilter: 'brightness(0.6)',
                                                    borderRadius: '20px',
                                                    px: 1
                                                }}
                                            >
                                                <Typography 
                                                    variant="subtitle1" 
                                                    align="center"
                                                    sx={{ 
                                                        fontWeight: 'bold',
                                                        color: '#fff',
                                                        textShadow: '0 1px 3px rgba(0,0,0,0.7)'
                                                    }}
                                                >
                                                    {card.title}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    ))}
                                </Grid>

                                {/* Right Column - YouTube Video */}
                                <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            height: 0,
                                            paddingBottom: '56.25%', // 16:9 aspect ratio
                                            overflow: 'hidden',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <iframe 
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                border: 0
                                            }}
                                            src="https://www.youtube.com/embed/rCRncbD1X7g?si=1iqezVk2sV-XEi6S" 
                                            title="YouTube video player" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                            referrerPolicy="strict-origin-when-cross-origin" 
                                            allowFullScreen
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </>
                        )}
                    </Fade>
                </>
                ) : (
                    <Fade in={true} timeout={500}>
                        <Box sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative'
                        }}>
                            {/* Back button */}
                            <Box sx={{ p: 2, pl: 3 }}>
                                <Button 
                                    onClick={handleBackClick}
                                    startIcon={<ArrowBackIcon />}
                                    sx={{ 
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 'medium',
                                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                        borderRadius: '20px',
                                        px: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)'
                                        }
                                    }}
                                >
                                </Button>
                            </Box>
                            {selectedCard.type === "info" && (
                                <Box
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        p: 3
                                    }}
                                >
                                    <Box 
                                        sx={{ 
                                            position: 'relative',
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '500px', // ⬅ shrink height
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                            border: '1px solid #1a93ca'
                                          }}
                                    >
                                        {/* Background image */}
                                        <CardMedia
                                            component="img"
                                            image={selectedCard.image}
                                            alt={selectedCard.title}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                filter: 'brightness(0.7)'
                                            }}
                                        />

                                        {/* Content overlay */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 4,
                                                backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    textAlign: 'center',
                                                    p: 3,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // optional: can adjust for readability
                                                }}
                                                >
                                                <Typography 
                                                    variant="h5" 
                                                    sx={{ 
                                                    color: 'white', 
                                                    fontWeight: 'bold',
                                                    mb: 2,
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                                                    }}
                                                >
                                                    {selectedCard.title}
                                                </Typography>
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                    color: 'white', 
                                                    maxWidth: '800px', 
                                                    fontSize: '1.1rem', 
                                                    lineHeight: 1.6,
                                                    textShadow: '0 1px 2px rgba(0,0,0,0.7)'
                                                    }}
                                                >
                                                    {selectedCard.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}

                            {selectedCard.type === "slider" && (
                                <ProcessOfDestruction cardDetails={selectedCard}/>
                            )}

                            {selectedCard.type === "simulation" && (
                                <Restoration simulationData={selectedCard}/>
                            )}

                            {selectedCard.type === "info-graph" && (
                                 <Box
                                     sx={{
                                     height: '80vh',
                                     width: '100%',
                                     display: 'flex',
                                     flexDirection: 'column',
                                     alignItems: 'center',
                                     justifyContent: 'center',
                                     p: 2,
                                     backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                     borderRadius: '16px',
                                     overflow: 'hidden',
                                     boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                     }}
                                 >
                                     <Typography 
                                     variant="h5" 
                                     sx={{ 
                                         color: 'white', 
                                         fontWeight: 'bold',
                                         mt:2,
                                         mb: 2,
                                         textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                                     }}
                                     >
                                     {selectedCard.title} Visualization
                                     </Typography>
 
                                     
                                     <Box sx={{ height: '100%', width: '100%' }}>
                                     {selectedCard.title === "Sea Star" && <SeastarMap />}
                                     {selectedCard.title === "Leafy Seadragon" && <SeadragonMap />}
                                     {selectedCard.title === "Spotted Handfish" && <HandfishMap />}
                                     {selectedCard.title === "Abalone" && <AbaloneMap />}
                                     {selectedCard.title === "Rapid Population Expansion" && <SeaUrchinMap />}
                                     {selectedCard.title === "Great Southern Reef" && <KelpMap />}
                                     </Box>
                                 </Box>
                                )}
                                {selectedCard.type === 'video' && (
                                    <Card>
                                        <h3>{selectedCard.title}</h3>
                                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                            <iframe
                                                src={selectedCard.videoUrl}
                                                title={selectedCard.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '80%',
                                                    height: '80%',
                                                }}
                                            />
                                        </div>
                                    </Card>
                                )}
                        </Box>
                    </Fade>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default InfoDialog;