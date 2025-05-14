import React, { useState } from 'react';
import {
  Dialog,
  Box,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import SectionContentRenderer from '../organisms/SectionContentRenderer';
import interactionStore from '../../store/interactionStore';

function InfoDialogV2({ open, onClose }) {
  const [selectedSection, setSelectedSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const {
    currentHotspot: hotspot,
    hotspotList,
    setCurrentHotspot,
    clearHotspot,
  } = interactionStore();

  const handleClose = () => {
    clearHotspot();
    onClose();
  };

  if (!hotspot || !hotspot.content) return null;

  const currentIndex = hotspotList.findIndex(h => h.id === hotspot?.id);

  const handleNext = () => {
    if (!hotspotList.length) return;
    const nextIndex = (currentIndex + 1) % hotspotList.length;
    setCurrentHotspot(hotspotList[nextIndex]);
    setSelectedSection(0);
  };

  const handlePrev = () => {
    if (!hotspotList.length) return;
    const prevIndex = (currentIndex - 1 + hotspotList.length) % hotspotList.length;
    setCurrentHotspot(hotspotList[prevIndex]);
    setSelectedSection(0);
  };

  const section = hotspot.content[selectedSection];

  return (
    <Dialog open={open} fullWidth maxWidth="xl">
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid #ccc',
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box component="button" onClick={handlePrev} sx={arrowBtnStyle}>‹</Box>

          <Box
            sx={{
              fontSize: {xs: '0.9rem', md: '1.4rem'},
              fontWeight: 'bold',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: { xs: '90vw', sm: '60vw' },
            }}
          >
            {hotspot.title}
          </Box>

          <Box component="button" onClick={handleNext} sx={arrowBtnStyle}>›</Box>
        </Box>

        <Box
          component="button"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.4rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          ✕
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} height="100%">
        {/* Tab Selector */}
        {isMobile ? (
          <Box>
            <Box
              onClick={() => setMenuOpen(prev => !prev)}
              sx={{
                width: '100%',
                px: 2,
                py: 1,
                backgroundColor: '#f2f2f2',
                textAlign: 'center',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
              }}
            >
              {hotspot.content[selectedSection].title} ▾
            </Box>
            <Collapse in={menuOpen} timeout="auto" unmountOnExit>
              <Box sx={{ px: 2, py: 1, backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}>
                {hotspot.content.map((item, index) => (
                  <Box
                    key={item.title}
                    onClick={() => {
                      setSelectedSection(index);
                      setMenuOpen(false);
                    }}
                    sx={{
                      py: 1,
                      textAlign: 'center',
                      backgroundColor: index === selectedSection ? '#1a93ca' : 'transparent',
                      color: index === selectedSection ? 'white' : 'black',
                      cursor: 'pointer',
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: index === selectedSection ? '#156fa3' : '#f0f0f0',
                      },
                    }}
                  >
                    {item.title}
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        ) : (
          <Box
            sx={{
              width: 250,
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid #ccc',
              py: 2,
              alignItems: 'center',
            }}
          >
            {hotspot.content.map((item, index) => (
              <Box
                key={item.label}
                onClick={() => setSelectedSection(index)}
                sx={{
                  position: 'relative',
                  height: 100,
                  width: '80%',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 3,
                  cursor: 'pointer',
                  my: 1,
                  border: index === selectedSection ? '3px solid #1a93ca' : '2px solid transparent',
                  boxShadow: index === selectedSection ? 5 : 1,
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: index === selectedSection ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.6)',
                    zIndex: 0,
                  },
                  '&:hover::after': {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    width: '100%',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    px: 1,
                  }}
                >
                  {item.title}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Content */}
        <Box flex={1} p={{ xs: 2, md: 4 }} overflow="auto" minHeight="300px">
          <SectionContentRenderer section={section} />
        </Box>
      </Box>
    </Dialog>
  );
}

const arrowBtnStyle = {
  backgroundColor: '#ffffffaa',
  border: 'none',
  borderRadius: '50%',
  width: 40,
  height: 40,
  cursor: 'pointer',
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

export default InfoDialogV2;
