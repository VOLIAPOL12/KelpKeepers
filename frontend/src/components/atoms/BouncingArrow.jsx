import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { LucideAArrowDown } from 'lucide-react';

function BouncingArrow() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-20px);
        }
        60% {
          transform: translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <IconButton 
      sx={{ 
        color: 'white',
        animation: 'bounce 2s infinite'
      }}
    >
      <LucideAArrowDown />
    </IconButton>
  );
}

export default BouncingArrow;