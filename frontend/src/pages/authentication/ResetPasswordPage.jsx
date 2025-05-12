import {
  TextField,
  Container,
  Paper,
  Typography,
  Button,
  Box
} from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import CustomInput from "../../components/atoms/CustomInput";
import { Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [combinedOTP, setCombinedOTP] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const { backendUri } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const val = element.target.value;
    if (!isNaN(val) && val.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      if (val && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const pasteArray = paste.split('');
    const newOtp = [...otp];

    pasteArray.forEach((char, index) => {
      if (index < 6 && !isNaN(char)) {
        newOtp[index] = char;
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      }
    });

    setOtp(newOtp);
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUri + '/api/auth/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    setCombinedOTP(code);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUri + '/api/auth/reset-password', { email, otp: combinedOTP, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #c3ecf5, #e1eec3)',
        p: 2
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        {!isEmailSent &&
          <Paper
            elevation={10}
            sx={{
              px: 4,
              py: 6,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}
          >
            <Typography variant='h5' fontWeight={600} gutterBottom>
              Reset Password
            </Typography>
            <Typography variant='body2' color="text.secondary">
              Enter your registered email address
            </Typography>
            <Box component='form' onSubmit={onSubmitEmail} sx={{ mt: 3 }}>
              <CustomInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                icon={<Email sx={{ color: 'text.secondary' }} />}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                Send Reset OTP
              </Button>
            </Box>
          </Paper>
        }

        {!isOtpSubmitted && isEmailSent &&
          <Paper
            elevation={10}
            sx={{
              px: 4,
              py: 6,
              mt: 2,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={2}>
              Email Verification
            </Typography>
            <Typography variant="body2" mb={4} color="text.secondary">
              Enter the 6-digit code sent to your email.
            </Typography>
            <Box display="flex" gap={1.5} justifyContent="center" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <TextField
                  key={index}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "20px" },
                  }}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  sx={{
                    width: 48,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: "#f1f5f9",
                      '& fieldset': {
                        borderColor: '#cbd5e1',
                      },
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                      },
                    },
                  }}
                />
              ))}
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 4, py: 1.5, borderRadius: 3, textTransform: 'none', fontWeight: 'bold' }}
              onClick={onSubmitOTP}
            >
              Verify
            </Button>
          </Paper>
        }

        {isOtpSubmitted && isEmailSent &&
          <Paper
            elevation={10}
            sx={{
              px: 4,
              py: 6,
              mt: 2,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography variant='h5' fontWeight={600}>
              Set New Password
            </Typography>
            <Box component='form' onSubmit={onSubmitNewPassword} sx={{ mt: 3 }}>
              <CustomInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                type="password"
                icon={<Lock sx={{ color: 'text.secondary' }} />}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                Reset Password
              </Button>
            </Box>
          </Paper>
        }
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
