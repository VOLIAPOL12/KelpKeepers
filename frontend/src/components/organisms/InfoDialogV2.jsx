import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import SectionContentRenderer from '../molecules/SectionContentRenderer'; // make sure this exists and renders each section

function InfoDialogV2({ open, onClose, hotspot }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedSection, setSelectedSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!hotspot || !hotspot.content) return null;
  console.log(hotspot);

  const section = hotspot.content[selectedSection];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: '85vh',
          borderRadius: 3,
          overflow: 'hidden',
          minWidth: '80%'
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight="bold">
            {hotspot.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <Collapse in={mobileMenuOpen}>
          <Box sx={{ px: 2, pt: 1, borderBottom: '1px solid #ddd', bgcolor: '#f5f5f5' }}>
            {hotspot.content.map((s, i) => (
              <Button
                key={s.id || i}
                fullWidth
                onClick={() => {
                  setSelectedSection(i);
                  setMobileMenuOpen(false);
                }}
                sx={{
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  mb: 1,
                  textTransform: 'none',
                }}
              >
                {s.title}
              </Button>
            ))}
          </Box>
        </Collapse>
      )}

      {/* Main Layout */}
      <DialogContent sx={{ p: 0, width: '100%' }}>
        <Grid
          container
          spacing={0}
          sx={{
            width: '100%',
            height: '100%',
            margin: 0,
            flexWrap: 'nowrap', // force single row
          }}
        >
          {/* Sidebar */}
          <Grid
            item
            xs={0}
            md={3}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              borderRight: '1px solid #ddd',
              bgcolor: '#fafafa',
              width: '50%',
              p: 2,
              boxSizing: 'border-box',
            }}
          >
            {hotspot.content.map((sectionItem, index) => (
              <Button
                key={sectionItem.id || index}
                fullWidth
                variant={selectedSection === index ? 'contained' : 'text'}
                onClick={() => setSelectedSection(index)}
                sx={{
                  mb: 1,
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                }}
              >
                {sectionItem.title}
              </Button>
            ))}
          </Grid>

          {/* Main Content */}
          <Grid
            item
            xs={12}
            md={9}
            sx={{
              p: 2,
              overflowY: 'auto',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                width: '100%',
                overflowY: 'auto',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                p: 4,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <SectionContentRenderer section={section} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

    </Dialog>
  );
}

export default InfoDialogV2;
