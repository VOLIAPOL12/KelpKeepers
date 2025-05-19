import { Box, Typography, Button, Paper, ClickAwayListener } from "@mui/material";

function HotspotTooltip({ anchorEl, onClose, title, description, gif, onReadMore }) {
  if (!anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Paper
        sx={{
          position: 'absolute',
          top: rect.top + window.scrollY - 120,
          left: rect.left + window.scrollX,
          zIndex: 999,
          padding: 2,
          width: 300,
        }}
        elevation={4}
      >
        {/* Animated GIF */}
        {gif && (
          <Box display="flex" justifyContent="center" mb={1}>
            <img src={gif} alt="Diver animation" style={{ width: 60, height: 60 }} />
          </Box>
        )}

        {/* Title */}
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        {/* Description */}
        <Typography variant="body2" paragraph>
          {description}
        </Typography>

        {onReadMore && (
          <Button variant="contained" size="small" onClick={onReadMore}>
            Learn More
          </Button>
        )}
      </Paper>
    </ClickAwayListener>
  );
}

export default HotspotTooltip;

