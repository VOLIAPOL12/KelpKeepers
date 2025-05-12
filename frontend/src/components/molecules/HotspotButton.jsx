import { Button } from "@mui/material";

function HotspotButton({ position, label, onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        position: 'absolute',
        ...position,
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        fontSize: { xs: '8px', md: '20px'},
        color: '#000',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontFamily: "'Reggae One', cursive",
        border: 4,
        px: 4,
        py: 2,
        '&:hover': {
          backgroundColor: 'rgba(0, 123, 255, 1)'
        }
      }}
    >
      {label}
    </Button>
  );
}

export default HotspotButton;
