
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box } from '@mui/material';
import useSpeciesStore from '../store/speciesStore';
import redExclamationIcon from '../assets/images/red exclamation mark.png';


const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41]
});

function MapEventHandler({ setBounds, setZoom }) {
  useMapEvents({
    moveend: (e) => {
      setBounds(e.target.getBounds());
      setZoom(e.target.getZoom());
    },
    zoomend: (e) => {
      setBounds(e.target.getBounds());
      setZoom(e.target.getZoom());
    }
  });
  return null;
}

const SpeciesMap = ({ species, selectedYear = 'All' }) => {
  const { data, fetchData } = useSpeciesStore();
  const [filteredData, setFilteredData] = useState([]);
  const [showDiveSites, setShowDiveSites] = useState(true);
  const [showKelp, setShowKelp] = useState(false);
  const [showSeaUrchin, setShowSeaUrchin] = useState(false);

  const [mapBounds, setMapBounds] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(6.5);
  const [visibleData, setVisibleData] = useState([]);

  const speciesMap = {
    "Sea Star": "seastar",
    "Leafy Seadragon": "commonSeadragon",
    "Spotted Handfish": "spottedHandfish",
    "Abalone": "abalone",
    "Rapid Population Expansion": "sea-urchin",
    "Great Southern Reef": "kelp",
    "Dive Sites": "dive-sites"
  };
  const normalizedSpecies = speciesMap[species] || species;

  const iconMap = {
    abalone: new L.Icon({ iconUrl: defaultIcon.options.iconUrl, iconSize: [25, 41], className: 'abalone-marker' }),
    commonSeadragon: new L.Icon({ iconUrl: defaultIcon.options.iconUrl, iconSize: [25, 41], className: 'seadragon-marker' }),
    seastar: new L.Icon({ iconUrl: defaultIcon.options.iconUrl, iconSize: [25, 41], className: 'seastar-marker' }),
    spottedHandfish: new L.Icon({ iconUrl: defaultIcon.options.iconUrl, iconSize: [25, 41], className: 'handfish-marker' }),
    kelp: new L.Icon({ iconUrl: defaultIcon.options.iconUrl, iconSize: [25, 41], className: 'kelp-marker' }),
    kelpRecent: new L.Icon({ iconUrl: redExclamationIcon, iconSize: [35, 55], popupAnchor: [0, -41] }),
    'sea-urchin': new L.Icon({ iconUrl: defaultIcon.options.iconUrl, iconSize: [25, 41], className: 'urchin-marker' }),
    'dive-sites': new L.Icon({ iconUrl: defaultIcon.options.iconUrl, iconSize: [25, 41], className: 'divesite-marker' })
  };

  useEffect(() => {
    if (!data[normalizedSpecies]) fetchData(normalizedSpecies);
    if (!data['dive-sites']) fetchData('dive-sites');
    if (!data['kelp']) fetchData('kelp');
    if (!data['sea-urchin']) fetchData('sea-urchin');
  }, [normalizedSpecies, fetchData]);

  useEffect(() => {
    if (filteredData.length > 0) {
      if (mapBounds) {
        const limited = filterVisiblePoints(filteredData);
        setVisibleData(limited);
      } else {
        setVisibleData(filteredData.slice(0, getLimitByZoom(currentZoom)));
      }
    }
  }, [filteredData, mapBounds, currentZoom]);

  useEffect(() => {
    if (data[normalizedSpecies]) {
      const isDiveSites = normalizedSpecies === 'dive-sites';
      const yearInt = parseInt(selectedYear);
      const filtered = selectedYear === 'All' || isDiveSites
        ? data[normalizedSpecies]
        : data[normalizedSpecies].filter(item => parseInt(item.year) <= yearInt);
      setFilteredData(filtered);
    }
  }, [data, normalizedSpecies, selectedYear]);

  const getLimitByZoom = (zoom) => {
    if (zoom >= 9) return 125;
    if (zoom >= 8) return 100;
    if (zoom >= 7) return 75;
    if (zoom >= 6) return 50;
    return 25;
  };

  const filterVisiblePoints = (points) => {
    if (!mapBounds) return [];
    const visiblePoints = points.filter(point => {
      const lat = parseFloat(point.decimalLatitude);
      const lng = parseFloat(point.decimalLongitude);
      return !isNaN(lat) && !isNaN(lng) && mapBounds.contains([lat, lng]);
    });
    return visiblePoints.slice(0, getLimitByZoom(currentZoom));
  };

  if (!data[normalizedSpecies]) return <div>Loading...</div>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 1, pr: 2 }}>
        <button
          className={`dive-toggle-button ${showDiveSites ? 'active' : ''}`}
          onClick={() => setShowDiveSites(!showDiveSites)}
        >
          {showDiveSites ? 'Hide Dive Sites' : 'Show Dive Sites'}
        </button>

        {normalizedSpecies !== 'kelp' && (
          <button
            className={`kelp-toggle-button ${showKelp ? 'active' : ''}`}
            onClick={() => setShowKelp(!showKelp)}
          >
            {showKelp ? 'Hide Kelp' : 'Show Kelp'}
          </button>
        )}

        {normalizedSpecies !== 'sea-urchin' && (
          <button
            className={`urchin-toggle-button ${showSeaUrchin ? 'active' : ''}`}
            onClick={() => setShowSeaUrchin(!showSeaUrchin)}
          >
            {showSeaUrchin ? 'Hide Sea Urchin' : 'Show Sea Urchin'}
          </button>
        )}
      </Box>


      <MapContainer
        center={[-42.0, 146.5]}
        zoom={currentZoom}
        style={{ height: '60vh', width: '100%' }}
        whenCreated={(map) => {
          setTimeout(() => {
            map.invalidateSize();
            setMapBounds(map.getBounds());
            setCurrentZoom(map.getZoom());
          }, 100);
        }}
      >
        <MapEventHandler setBounds={setMapBounds} setZoom={setCurrentZoom} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* 当前物种 */}
        {visibleData.map((point, index) => {
          const lat = parseFloat(point.decimalLatitude);
          const lng = parseFloat(point.decimalLongitude);

          const isKelp = normalizedSpecies === 'kelp';
          const uploadDate = new Date(point.uploadtime);
          const now = new Date();
          const uploadDay = new Date(uploadDate.getFullYear(), uploadDate.getMonth(), uploadDate.getDate());
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const dayDifference = Math.abs(today - uploadDay) / (1000 * 60 * 60 * 24);
          const isRecentUpload = dayDifference <= 7;
          const icon = isKelp ? (isRecentUpload ? iconMap['kelpRecent'] : iconMap['kelp']) : (iconMap[normalizedSpecies] || defaultIcon);

          return (
            <Marker key={`species-${index}`} position={[lat, lng]} icon={icon}>
              <Popup>
                {isKelp ? (
                  <>
                    KELP<br />
                    Year: {point.year}<br />
                    Uploaded: {point.uploadtime}<br />
                    Location: {point.stateProvince}
                  </>
                ) : (
                  <>
                    {species.toUpperCase()}<br />
                    Year: {point.year}<br />
                    Location: {point.stateProvince}
                  </>
                )}
              </Popup>
            </Marker>
          );
        })}

        {/* Dive Sites */}
        {showDiveSites && (
          (mapBounds ? filterVisiblePoints(data['dive-sites']) : (data['dive-sites'] || []).slice(0, getLimitByZoom(currentZoom)))
        ).map((site, idx) => {
          const lat = parseFloat(site.decimalLatitude);
          const lng = parseFloat(site.decimalLongitude);
          return (
            <Marker key={`dive-${idx}`} position={[lat, lng]} icon={iconMap['dive-sites']}>
              <Popup>
                Dive Site: {site["Diver site"]}
              </Popup>
            </Marker>
          );
        })}

        {/* Kelp Points */}
        {showKelp && (
          (mapBounds ? filterVisiblePoints(data['kelp']) : (data['kelp'] || []).slice(0, getLimitByZoom(currentZoom)))
        ).map((kelpPoint, index) => {
          const lat = parseFloat(kelpPoint.decimalLatitude);
          const lng = parseFloat(kelpPoint.decimalLongitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          const uploadDate = new Date(kelpPoint.uploadtime);
          const now = new Date();
          const uploadDay = new Date(uploadDate.getFullYear(), uploadDate.getMonth(), uploadDate.getDate());
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const dayDifference = Math.abs(today - uploadDay) / (1000 * 60 * 60 * 24);
          const isRecentUpload = dayDifference <= 1;

          const icon = isRecentUpload ? iconMap['kelpRecent'] : iconMap['kelp'];

          return (
            <Marker key={`kelp-${index}`} position={[lat + 0.002, lng + 0.002]} icon={icon}>
              <Popup>
                KELP<br />
                Year: {kelpPoint.year}<br />
                Uploaded: {kelpPoint.uploadtime}<br />
                Location: {kelpPoint.stateProvince}
              </Popup>
            </Marker>
          );
        })}

        {/* Sea Urchin Points */}
        {showSeaUrchin && (
          (mapBounds ? filterVisiblePoints(data['sea-urchin']) : (data['sea-urchin'] || []).slice(0, getLimitByZoom(currentZoom)))
        ).map((urchinPoint, index) => {
          const lat = parseFloat(urchinPoint.decimalLatitude);
          const lng = parseFloat(urchinPoint.decimalLongitude);
          return (
            <Marker key={`urchin-${index}`} position={[lat - 0.002, lng - 0.002]} icon={iconMap['sea-urchin']}>
              <Popup>
                SEA URCHIN<br />
                Year: {urchinPoint.year}<br />
                Location: {urchinPoint.stateProvince}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default SpeciesMap;
