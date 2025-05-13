import React, { useState } from 'react';
import {
  Dialog,
  Box,
} from '@mui/material';

import SectionContentRenderer from '../organisms/SectionContentRenderer'
import interactionStore from '../../store/interactionStore';

function InfoDialogV2({ open, onClose }) {
  const [selectedSection, setSelectedSection] = useState(0);

  // State management for hotspot selection
  const { currentHotspot: hotspot, clearHotspot } = interactionStore();

  const handleClose = () => {
    clearHotspot();
    onClose();
  };

  if (!hotspot || !hotspot.content) return null;

  const section = hotspot.content[selectedSection];

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <Box sx={{display: 'flex', borderBottom: '1px solid #ccc', alignItems: 'center', justifyContent: 'center', pr: 3}} >
        <Box
          sx={{
            zIndex: 10,
          }}
        >
          <Box
            component="button"
            sx={{
              backgroundColor: '#ffffffaa',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
            onClick={() => console.log('Previous hotspot')}
          >
            ‹
          </Box>
        </Box>
        <Box
          sx={{
            p: 2,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {hotspot.title}
        </Box>

        <Box
          sx={{
            zIndex: 10,
          }}
        >
          <Box
            component="button"
            sx={{
              backgroundColor: '#ffffffaa',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
            onClick={() => console.log('Next hotspot')}
          >
            ›
          </Box>
        </Box>
      </Box>

      {/* Close Button */}
      <Box
        component="button"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: '19px',
          top: '16px',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#444',
          cursor: 'pointer',
          '&:hover': {
            color: '#000',
          },
        }}
      >
        ✕
      </Box>

      {/* Header */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} height="100%">
        {/* Mobile: dropdown, Desktop: vertical menu */}
        <Box
          sx={{
            width: { xs: '100%', md: 250 },
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            overflowX: { xs: 'auto', md: 'visible' },
            borderRight: { md: '1px solid #ccc' },
            alignItems: {md: 'center'}
          }}
        >
          {hotspot.content.map((item, index) => (
            <Box
              key={item.label}
              onClick={() => setSelectedSection(index)}
              sx={{
                position: 'relative',
                flexShrink: 0,
                height: { xs: 80, md: 80 },
                width: { xs: 130, md: '80%' },
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 3,
                cursor: 'pointer',
                mx: { xs: 0.5, md: 0 },
                my: { xs: 1, md: 1.5 },
                border: index === selectedSection ? '3px solid #1a93ca' : '2px solid transparent',
                boxShadow: index === selectedSection ? 5 : 1,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: index === selectedSection
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(0, 0, 0, 0.6)',
                  transition: 'background-color 0.3s ease',
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

        {/* Content area */}
        <Box flex={1} p={3} overflow="auto">
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${section.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              boxSizing: 'border-box',
            }}
          >
            <SectionContentRenderer section={section}/>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default InfoDialogV2;
