import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, CardMedia, CircularProgress } from '@mui/material';
import { AppContent } from '../context/AppContext';

function PhotoCapturePage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [resultJson, setResultJson] = useState(false)

  const { backendUri } = useContext(AppContent);
  

  const handleAnalyze = async () => {
    setLoading(true);
    const blob = dataURLtoBlob(image);
    const formData = new FormData();
    formData.append('image', blob, 'kelp-photo.jpg');
  
    try {
      const res = await axios.post(backendUri + '/api/kelp-detection/identification', formData);
      const info = res.data.information;
      setAnalysisResult(info); // optional: keep for reference

      let structured;
      try {
        structured = JSON.parse(info);
        setResultJson(structured);
      } catch (e) {
        console.warn('Failed to parse Gemini response as JSON. Sending raw text.');
        setResultJson(null);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong analyzing the photo.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }

  return (
    <Box sx={{ py: 10, maxWidth: 500, margin: 'auto', textAlign: 'center' }}>

      <Typography variant="h5" gutterBottom>
        Take a Photo of Kelp
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Use your phone camera to capture kelp sightings underwater.
      </Typography>

      <label htmlFor="capture-kelp" style={{ marginTop: 16, display: 'inline-block' }}>
        <input
          accept="image/*"
          capture="environment"
          type="file"
          id="capture-kelp"
          style={{ display: 'none' }}
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
        <Button variant="contained" component="span" sx={{ mt: 2 }}>
          📷 Take Photo
        </Button>
      </label>

      {image && (
        <Box mt={3}>
          <Typography variant="h6">Preview</Typography>
          <CardMedia
            component="img"
            src={image}
            alt="Captured"
            sx={{ mt: 1, borderRadius: 2, boxShadow: 2, maxHeight: 400 }}
          />
          <Button variant="contained" color="success" onClick={handleAnalyze} sx={{ mt: 2 }}>
            Analyze with AI
          </Button>
        </Box>
      )}
      {
        loading && (
          <Box sx={{ display: 'flex'}}>
              <CircularProgress/>
          </Box>
        )
      }

      {resultJson && (
        <Box
          mt={4}
          p={3}
          sx={{
            backgroundColor: '#F0F4F8',
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', mb: 2, color: '#2E7D32', borderBottom: '2px solid #2E7D32', pb: 1 }}
          >
            🧠 AI Results
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {resultJson.plantName}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: resultJson.isKelp ? '#388E3C' : '#D32F2F',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            {resultJson.isKelp ? '✅ Kelp Detected' : '❌ Not Kelp'}
          </Typography>

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {resultJson.plantDescription}
          </Typography>
        </Box>
      )}

    </Box>
  );
}

export default PhotoCapturePage;