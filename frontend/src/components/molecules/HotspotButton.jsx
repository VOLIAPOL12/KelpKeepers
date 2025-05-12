import { Button, Tooltip } from "@mui/material";

function HotspotButton({ position, label, onClick }) {
  return (
    <Tooltip
      title="Add"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
    >
      
    </Tooltip>
  );
}

export default HotspotButton;
