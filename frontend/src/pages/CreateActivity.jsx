import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useDivingSiteStore from '../store/useDivingSiteStore';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const steps = ['Dive Details', 'Select Location'];

const CreateActivity = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [selectedSite, setSelectedSite] = useState(null);

  const { diveSites, loadDiveSites, loading } = useDivingSiteStore();
  const { userData } = useContext(AppContent);

  useEffect(() => {
    if (!userData?.isPadiVerified) {
      toast.error("Please verify your PADI before you create an activity!")
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  const [formData, setFormData] = useState({
    host_user_id: '',
    title: '',
    description: '',
    date: '',
    slots: '',
    location: null,
  });

  useEffect(() => {
    if (page === 2 && diveSites.length === 0) loadDiveSites();
  }, [page, loadDiveSites, diveSites.length]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleLocationSelect = (site) => {
    setSelectedSite(site);
    console.log(site);
    setFormData({ ...formData, location: site.id });
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const payload = {
        host_user_id: userData.user_id,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        slots_available: parseInt(formData.slots, 10),
        divesite_id: formData.location,
      };

      const response = await axios.post('/api/diving-activities', payload);
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f9ff', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create Dive Activity
        </Typography>

        <Stepper activeStep={page - 1} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {page === 1 && (
          <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Dive Title"
              value={formData.title}
              onChange={handleChange('title')}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
              required
            />
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange('date')}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Number of Slots"
              type="number"
              value={formData.slots}
              onChange={handleChange('slots')}
              fullWidth
              required
              inputProps={{ min: 1 }}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={nextPage}>Next</Button>
            </Box>
          </Box>
        )}

        {page === 2 && (
          <Box>
            {loading ? (
              <Typography>Loading map...</Typography>
            ) : (
              <Box sx={{ height: { xs: 400, md: 500 }, width: '100%' }}>
                <MapContainer
                  center={[-38, 145]}
                  zoom={6}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {diveSites.map((site) => (
                    <Marker
                      key={site.id}
                      position={[site.decimalLatitude, site.decimalLongitude]}
                      eventHandlers={{
                        click: () => handleLocationSelect(site),
                      }}
                    >
                      <Popup>{site["Diver site"]}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </Box>
            )}

            {selectedSite && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1">
                  Selected Site: <strong>{selectedSite["Diver site"]}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lat: {selectedSite.decimalLatitude}, Lng: {selectedSite.decimalLongitude}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {page > 1 && (
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button onClick={prevPage}>Back</Button>
            {page < steps.length ? (
              <Button variant="contained" onClick={nextPage}>Next</Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CreateActivity;