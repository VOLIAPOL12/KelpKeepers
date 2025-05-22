import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Grid, Typography, Divider, Box
} from '@mui/material';
import Papa from 'papaparse';
import { submitDiveEntry, updateDiveEntry } from '../../api/dive-history';
import useDivingHistoryStore from '../../store/useDiveHistoryStore';

const DiveLogDialog = ({ open, onClose, existingData }) => {
    const [errors, setErrors] = useState({});
    const {
        loadDiveHistory
    } = useDivingHistoryStore();

    const [formData, setFormData] = useState({
        found_kelp: '',
        plant_kelp: '',
        remove_urchin: '',
        duration: '',
        date: '',
        start_time: '',
        temperature_celsius: '',
        latitude: '',
        longitude: '',
        notes: '',
    });

    useEffect(() => {
        if (existingData?.resultExists) {
            const rawDate = existingData.log_date;
            const rawTime = existingData.log_start_time;

            const safeDate = rawDate ? rawDate.slice(0, 10) : '';
            const safeTime = rawTime?.length >= 5 ? rawTime.slice(0, 5) : '';
            setFormData({
                found_kelp: existingData['found kelp'] ?? '',
                plant_kelp: existingData['plant kelp'] ?? '',
                remove_urchin: existingData['remove urchin'] ?? '',
                duration: existingData.result_duration ?? '',
                date: safeDate ?? '',
                start_time: safeTime ?? '',
                temperature_celsius: existingData.temperature_celsius ?? '',
                latitude: existingData.latitude ?? '',
                longitude: existingData.longitude ?? '',
                notes: existingData.notes ?? '',
            });
        }
    }, [existingData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const convertedValue = value === 'true' ? true : value === 'false' ? false : value;
        setFormData((prev) => ({ ...prev, [name]: convertedValue }));
    };

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
      
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const row = results.data[0]; // assuming first row only
        
                if (row) {
                const [siteName, gps] = (row.Location || '').split('\n');
        
                // Optional: Convert DMS GPS to decimal
                const parseLatLng = (gpsStr) => {
                    const regex = /(\d+)[°:-](\d+\.\d+)([NS])\s+(\d+)[°:-](\d+\.\d+)([EW])/;
                    const match = gpsStr.match(regex);
                    if (!match) return [null, null];
        
                    const lat = parseFloat(match[1]) + parseFloat(match[2]) / 60;
                    const lng = parseFloat(match[4]) + parseFloat(match[5]) / 60;
        
                    return [
                    match[3] === 'S' ? -lat : lat,
                    match[6] === 'W' ? -lng : lng,
                    ];
                };
        
                const [latitude, longitude] = parseLatLng(gps);
        
                setFormData((prev) => ({
                    ...prev,
                    dive_site_name: siteName || '',
                    latitude: latitude || '',
                    longitude: longitude || '',
                    duration: row['Dive Time (Min)'] || '',
                    date: row['Date / Time'] ? new Date(row['Date / Time']).toISOString().slice(0, 10) : '',
                    start_time: row['Date / Time'] ? new Date(row['Date / Time']).toTimeString().slice(0, 5) : '',
                    max_depth_meters: row['Depth (M)'] || '',
                    avg_depth_meters: row['Avg Depth (M)'] || '',
                    duration_minutes: row['Dive Time (Min)'] || '',
                    temperature_celsius: row['Temp (C\')'] || '',
                    notes: row['Skill(s) Taught'] || '',
                }));
                }
            },
            error: (err) => {
                console.error('CSV parsing error:', err.message);
            }
        });
      
        // Allow same file to be selected again
        e.target.value = '';
    };

    const validateForm = () => {
        const newErrors = {};
      
        // Required booleans
        if (formData.found_kelp === '') newErrors.found_kelp = 'Required';
        if (formData.plant_kelp === '') newErrors.plant_kelp = 'Required';
        if (formData.remove_urchin === '') newErrors.remove_urchin = 'Required';
      
        // Duration
        if (!formData.duration) {
            newErrors.duration = 'Required';
        } else if (isNaN(formData.duration) || Number(formData.duration) <= 0) {
            newErrors.duration = 'Must be a positive number';
        }
      
        // Date
        if (!formData.date) {
            newErrors.date = 'Required';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
            newErrors.date = 'Format must be YYYY-MM-DD';
        }
      
        // Start time
        if (!formData.start_time) {
            newErrors.start_time = 'Required';
        } else if (!/^\d{2}:\d{2}$/.test(formData.start_time)) {
            newErrors.start_time = 'Format must be HH:mm (24-hour)';
        }
      
        // Temperature
        if (
            formData.temperature_celsius &&
            isNaN(Number(formData.temperature_celsius))
        ) {
            newErrors.temperature_celsius = 'Must be a number';
        }
      
        // Coordinates
        ['latitude', 'longitude'].forEach((coord) => {
            const val = formData[coord];
            if (val !== '') {
                const num = Number(val);
                if (isNaN(num)) {
                    newErrors[coord] = 'Must be a valid number';
                } else if (
                    (coord === 'latitude' && (num < -90 || num > 90)) ||
                    (coord === 'longitude' && (num < -180 || num > 180))
                ) {
                    newErrors[coord] = `${coord === 'latitude' ? 'Latitude' : 'Longitude'} out of range`;
                }
            }
        });
          
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
      

    const handleSubmit = async () => {
        if (!validateForm()) return;
        const payload = {
            ...formData,
            event_id: existingData.event_id,
            created_at: new Date().toISOString(),
        };

        const missingFields = ['found_kelp', 'plant_kelp', 'remove_urchin'].filter(
                key => formData[key] === ''
            );
            
            if (missingFields.length > 0) {
                alert(`Please complete all required fields: ${missingFields.join(', ')}`);
                return;
        }
        
        try {
            if (existingData.resultExists) {
                payload.result_id = existingData.result_id;
                console.log(existingData);
                await updateDiveEntry(payload); // PUT
                await loadDiveHistory();
            } else {
                await submitDiveEntry(payload); // POST
                await loadDiveHistory();
            }
        
            onClose();
        } catch (err) {
            console.error('Failed to submit dive data:', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">Upload Dive Data — <strong>{existingData?.title}</strong></Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Box mb={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Upload CSV from dive computer
                    </Typography>
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ mt: 1 }}
                    >
                        Choose CSV File
                        <input type="file" accept=".csv" hidden onChange={handleCSVUpload} />
                    </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <form onSubmit={handleSubmit}>
                <Typography variant="subtitle1" gutterBottom>🌿 Dive Result</Typography>

                <Grid container spacing={2} mt={0.5}>
                    {['found_kelp', 'plant_kelp', 'remove_urchin'].map((field) => (
                    <Grid item xs={12} sm={4} key={field}>
                        <FormControl component="fieldset" error={!!errors[field]}>
                            <FormLabel required>{field.replace('_', ' ').toUpperCase()}</FormLabel>
                            <RadioGroup row name={field} value={formData[field]} onChange={handleChange}>
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors[field] && (
                                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                                {errors[field]}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                    ))}
                </Grid>

                <TextField
                    label="Duration (min)"
                    name="duration"
                    type="number"
                    fullWidth
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    error={!!errors.duration}
                    helperText={errors.duration}
                />

                <Divider sx={{ my: 4 }} />

                <Typography variant="subtitle1" gutterBottom>📝 Dive Log</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <TextField
                        label="Dive Date"
                        name="date"
                        type="date"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        value={formData.date}
                        onChange={handleChange}
                        error={!!errors.date}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        label="Start Time"
                        name="start_time"
                        type="time"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        value={formData.start_time}
                        onChange={handleChange}
                        error={!!errors.start_time}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        label="Water Temp (°C)"
                        name="temperature_celsius"
                        type="number"
                        fullWidth
                        value={formData.temperature_celsius}
                        onChange={handleChange}
                        error={!!errors.temperature_celsius}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        label="Latitude"
                        name="latitude"
                        type="number"
                        fullWidth
                        value={formData.latitude}
                        onChange={handleChange}
                        error={!!errors.latitude}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        label="Longitude"
                        name="longitude"
                        type="number"
                        fullWidth
                        value={formData.longitude}
                        onChange={handleChange}
                        error={!!errors.longitude}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        label="Notes / Marine Life"
                        name="notes"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        error={!!errors.latitude}
                    />
                    </Grid>
                </Grid>
                </form>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                Submit Dive Log
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DiveLogDialog;
