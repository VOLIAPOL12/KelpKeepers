import { Box, Typography, Button, Paper, ClickAwayListener, Tooltip } from "@mui/material";

function HotspotTooltip({ anchorEl, onClose, title, description, onReadMore }) {
  if (!anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <Tooltip>
      {children}
    </Tooltip>
  );
}

export default HotspotTooltip;
