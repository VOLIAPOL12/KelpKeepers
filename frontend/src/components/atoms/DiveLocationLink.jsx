import { Link, Typography, Stack } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';

const DiveLocationLink = ({ name, latitude, longitude }) => {
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <Typography variant="body2">
      <Link
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        color="inherit"
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <span>{name}</span>
          <NavigationIcon fontSize="small" />
        </Stack>
      </Link>
    </Typography>
  );
};

export default DiveLocationLink;