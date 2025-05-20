import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Grid, Typography, Divider, Box
} from '@mui/material';
import Papa from 'papaparse';
import { submitDiveEntry } from '../../api/dive-history';

const DiveLogDialog = ({ open, onClose, eventId, eventTitle }) => {
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
            const row = results.data[0];

            if (row) {
                setFormData((prev) => ({
                    ...prev,
                    date: row.date || prev.date,
                    start_time: row.start_time || prev.start_time,
                    temperature_celsius: row.temperature_celsius || prev.temperature_celsius,
                    latitude: row.latitude || prev.latitude,
                    longitude: row.longitude || prev.longitude,
                    notes: row.notes || prev.notes,
                }));
            }
            },
            error: (err) => {
            console.error('CSV parsing error:', err.message);
            }
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
        event_id: eventId,
        ...formData,
        created_at: new Date().toISOString(),
        };

        submitDiveEntry(payload);
        // TODO: Send to backend
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
            <Typography variant="h6">Upload Dive Data — <strong>{eventTitle}</strong></Typography>
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
                    <FormControl component="fieldset">
                    <FormLabel>{field.replace('_', ' ').toUpperCase()}</FormLabel>
                    <RadioGroup
                        row
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                ))}
            </Grid>

            <TextField
                label="Duration (min)"
                name="duration"
                type="number"
                required
                fullWidth
                sx={{ mt: 3 }}
                value={formData.duration}
                onChange={handleChange}
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
