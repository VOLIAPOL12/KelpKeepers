import React, { useState } from 'react';
import {
  Dialog,
  Box,

} from '@mui/material';

import SectionContentRenderer from '../molecules/SectionContentRenderer'; // make sure this exists and renders each section

function InfoDialogV2({ open, onClose, hotspot }) {
  const [selectedSection, setSelectedSection] = useState(0);

  if (!hotspot || !hotspot.content) return null;

  const section = hotspot.content[selectedSection];

  return (
    <Dialog open={open} fullWidth maxWidth="md">
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #ccc',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
          }}
        >
          {hotspot.title}
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '6%',
            left: 16,
            transform: 'translateY(-50%)',
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
            position: 'absolute',
            top: '6%',
            right: 16,
            transform: 'translateY(-50%)',
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
      }}
    >
      {hotspot.content.map((item, index) => (
        <Box
          key={item.label}
          onClick={() => setSelectedSection(index)}
          sx={{
            position: 'relative',
            flexShrink: 0,
            height: { xs: 80, md: 130 },
            width: { xs: 130, md: '100%' },
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 3,
            cursor: 'pointer',
            mx: { xs: 0.5, md: 0 },
            my: { xs: 0, md: 1.5 },
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
        <Box
          sx={{
            fontWeight: 'bold',
            fontSize: '1.4rem',
            mb: 2,
          }}
        >
          {section.title}
        </Box>
        <Box sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
          {section.description}
        </Box>
      </Box>
    </Box>

    </Box>
  </Box>

    </Dialog>
  );
}

export default InfoDialogV2;
