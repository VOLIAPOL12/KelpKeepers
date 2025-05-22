import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const UserProfilePage = () => {
  const { userData, updateUserProfile } = useContext(AppContent);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    padi_certification: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        password: '',
        padi_certification: userData.padi_certification || ''
      });
      setLoading(false);
    }
  }, [userData]);

  const handleVerifyEmail = async () => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/auth/send-verify-otp',
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (formData.password.trim()) {
      const password = formData.password.trim();
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  
      if (!strongPasswordRegex.test(password)) {
        toast.error('Password must be at least 8 characters and include uppercase, lowercase, and a special character.');
        return;
      }
    }
  
    const payload = {
      name: formData.name,
      padi_certification: formData.padi_certification
    };
  
    if (formData.password.trim()) {
      payload.password = formData.password.trim();
    }
  
    const padiChanged =
      formData.padi_certification.trim() !== '' &&
      formData.padi_certification !== (userData.padi_certification || '');
  
    const success = await updateUserProfile(payload);
  
    if (success) {
      setEditMode(false);
      if (padiChanged) {
        toast.info('Thanks! We’ll verify your PADI certification within 3 business days.');
      }
    }
  };
  
  

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      password: '',
      padi_certification: userData.padi_certification || ''
    });
    setEditMode(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {!editMode ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar sx={{ width: 100, height: 100 }}>
            {userData.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Typography variant="h4">{userData.name}</Typography>
          <Typography color="text.secondary">{userData.email}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Joined: {new Date(userData.createdAt).toLocaleDateString()}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Chip
              label={userData.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
              color={userData.isEmailVerified ? 'success' : 'warning'}
            />
            {!userData.isEmailVerified && (
              <Button variant="outlined" onClick={handleVerifyEmail}>
                Verify Email
              </Button>
            )}
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Chip
              label={userData.isPadiVerified ? 'PADI Verified' : 'PADI Not Verified'}
              color={userData.isPadiVerified ? 'success' : 'warning'}
            />
          </Stack>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Leave blank to keep current password"
            />
            <TextField
              fullWidth
              margin="normal"
              label="PADI Certification"
              name="padi_certification"
              value={formData.padi_certification}
              onChange={handleInputChange}
              placeholder="Enter your PADI cert or ID"
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Container>
  );
};

export default UserProfilePage;
