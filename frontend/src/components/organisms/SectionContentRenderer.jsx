import React from "react";

import SliderSection from "../molecules/SliderSection";
import { Box } from "@mui/material";
import InfoGraphSection from "../molecules/InfoGraphSection";

const SectionContentRenderer = ({ section }) => {
    switch (section.type) {
      case 'slider':
        return <SliderSection section={section} />;
      case 'info-graph':
        return <InfoGraphSection />;
      case 'info':
      default:
        return (
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
              <Box sx={{ fontWeight: 'bold', fontSize: '1.4rem', mb: 2 }}>
                {section.title}
              </Box>
              <Box sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                {section.description}
              </Box>
            </Box>
          </Box>
        );
    }
}
  
export default SectionContentRenderer;