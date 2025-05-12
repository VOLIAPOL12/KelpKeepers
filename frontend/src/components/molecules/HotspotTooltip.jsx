import { Box, Typography, Button, Paper, ClickAwayListener } from "@mui/material";

function HotspotTooltip({ anchorEl, onClose, title, description, onReadMore }) {
  if (!anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
          zIndex: 1000,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 2,
            borderRadius: 2,
            maxWidth: 320,
            bgcolor: "rgba(255,255,255,0.95)",
            border: "2px solid #1a93ca",
          }}
        >
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{description}</Typography>
          <Button size="small" onClick={onReadMore}>Read More →</Button>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
}

export default HotspotTooltip;
