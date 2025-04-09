import React from 'react';
import { Typography, Fade } from '@mui/material';

function FadeTypography({ show, timeout, variant, component, sx, children, ...props}) {
    return (
        <Fade in={show} timeout={timeout || 1000}>
          <Typography variant={variant} component={component} sx={sx} {...props}>
            {children}
          </Typography>
        </Fade>
    );
}

export default FadeTypography