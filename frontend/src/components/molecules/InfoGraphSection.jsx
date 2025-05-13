import { useState, useEffect } from 'react';
import {
  Box, Typography, Select, MenuItem, Slider, Button, FormControl, InputLabel, useMediaQuery
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchSpeciesData, fetchKelpData } from '../../api';

const seastarIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
});

const kelpIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
});

const InfoGraphSection = () => {
  const isMobile = useMediaQuery('(max-width:900px)');

  const [seastarData, setSeastarData] = useState([]);
  const [kelpData, setKelpData] = useState([]);
  const [filteredSeastar, setFilteredSeastar] = useState([]);
  const [filteredKelp, setFilteredKelp] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [showKelp, setShowKelp] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    fetchSpeciesData('seastar').then((data) => {
      setSeastarData(data);
      const uniqueYears = Array.from(new Set(data.map(item => item.year))).sort();
      setYears(['All', ...uniqueYears]);
      setMinYear(Math.min(...uniqueYears));
      setMaxYear(Math.max(...uniqueYears));
    });

    fetchKelpData().then(setKelpData);
  }, []);

  useEffect(() => {
    const year = selectedYear === 'All' ? Infinity : parseInt(selectedYear);
    setFilteredSeastar(seastarData.filter(item => parseInt(item.year) <= year));
    setFilteredKelp(kelpData.filter(item => parseInt(item.year) <= year));
  }, [selectedYear, seastarData, kelpData]);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentYear((prev) =>
          prev === null || prev >= maxYear ? minYear : prev + 1
        );
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [autoPlay, minYear, maxYear, currentYear]);

  useEffect(() => {
    if (currentYear !== null) {
      setSelectedYear(currentYear.toString());
    }
  }, [currentYear]);

  if (!seastarData.length) return <Typography>Loading map data...</Typography>;

  return (
    <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={3} height="100%">
      {/* Info Box */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#1b1b1b',
          color: 'white',
          borderRadius: 2,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Seastar Information
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          One of the world’s rarest seastars, once abundant in Tasmania’s coastal waters,
          has declined by nearly 90% over the past 20 years. Habitat destruction and
          competition from invasive seastar species have driven it to the brink of extinction.
        </Typography>
      </Box>

      {/* Map + Controls */}
      <Box flex={1.2}>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: 'white', mb: 1 }}
        >
          Seastar Distribution Map
        </Typography>

        {/* Controls */}
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={1}>
          <FormControl size="small">
            <InputLabel id="year-select-label" sx={{ color: 'white' }}>Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setAutoPlay(false);
              }}
              sx={{ minWidth: 100, backgroundColor: 'white', borderRadius: 1 }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {minYear && maxYear && (
            <Slider
              min={minYear}
              max={maxYear}
              value={selectedYear === 'All' ? minYear : parseInt(selectedYear)}
              onChange={(e, val) => {
                setSelectedYear(val.toString());
                setAutoPlay(false);
              }}
              valueLabelDisplay="auto"
              sx={{ width: 160 }}
            />
          )}

          <Button
            size="small"
            variant="contained"
            onClick={() => setAutoPlay(!autoPlay)}
            color={autoPlay ? 'error' : 'primary'}
          >
            {autoPlay ? 'Stop' : 'Autoplay'}
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={() => setShowKelp(!showKelp)}
            sx={{ color: 'white', borderColor: 'white' }}
          >
            {showKelp ? 'Hide Kelp' : 'Show Kelp'}
          </Button>
        </Box>

        {/* Map */}
        <MapContainer
          center={[-42.0, 146.5]}
          zoom={6.5}
          style={{ height: '60vh', width: '100%', borderRadius: 12 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {filteredSeastar.map((point, idx) => {
            const lat = parseFloat(point.decimalLatitude);
            const lng = parseFloat(point.decimalLongitude);
            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker
                key={`seastar-${idx}`}
                position={[lat, lng]}
                icon={seastarIcon}
              >
                <Popup>
                  Year: {point.year}
                  <br />
                  Location: {point.stateProvince}
                </Popup>
              </Marker>
            );
          })}

          {showKelp && filteredKelp.map((point, idx) => {
            const lat = parseFloat(point.decimalLatitude);
            const lng = parseFloat(point.decimalLongitude);
            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker
                key={`kelp-${idx}`}
                position={[lat, lng]}
                icon={kelpIcon}
              >
                <Popup>
                  Year: {point.year}
                  <br />
                  Location: {point.stateProvince}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default InfoGraphSection;
