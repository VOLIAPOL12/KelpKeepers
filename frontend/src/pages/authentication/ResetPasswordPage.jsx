import { TextField, Container, Paper, Typography, Button, Box,  } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
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

  const { backendUri} = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const val = element.target.value;
    if (!isNaN(val) && val.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      // Move to next input
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
      const { data } = await axios.post(backendUri + '/api/auth/send-reset-otp', {email});
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    setCombinedOTP(code);
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUri + '/api/auth/reset-password', {email, otp: combinedOTP, newPassword});
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Container maxWidth="xs">
      {!isEmailSent && 
      <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>
        <Typography component='h1' variant='h5' sx={{textAlign: "center"}}>
            Reset Password
        </Typography>
        <Typography component='p' sx={{textAlign: "center"}}>
            Enter your registered email address
        </Typography>
        <Box component='form' onSubmit={onSubmitEmail} noValidate sx={{ mt : 1 }}>
            <CustomInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                icon={<Email style={{ color: '#ccc' }} />}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt : 1 }}>
                Send Reset OTP
            </Button>
        </Box>
      </Paper>
      }
      
      {!isOtpSubmitted && isEmailSent &&
        <Paper elevation={10} sx={{ p: 5, borderRadius: 3, textAlign: "center", bgcolor: "#0f172a", color: "white" }}>
            <Typography variant="h5" mb={2}>Email Verify OTP</Typography>
            <Typography variant="body2" mb={4}>Enter the 6-digit code sent to your email id.</Typography>
            
            <Box display="flex" gap={2} justifyContent="center" onPaste={handlePaste}> 
            {otp.map((data, index) => (
                <TextField
                key={index}
                inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "20px", color: "white" },
                }}
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                sx={{
                    width: 50,
                    "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#1e293b",
                    '& fieldset': {
                        borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                        borderColor: '#60a5fa',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                    },
                    },
                }}
                />
            ))}
            </Box>
            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 4 }}
                onClick={onSubmitOTP}
            >
                Verify
            </Button>
        </Paper>
      }
      
      {isOtpSubmitted && isEmailSent &&
        <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>

          <Typography component='h1' variant='h5' sx={{textAlign: "center"}}>
              New Password
          </Typography>
          <Box component='form' onSubmit={onSubmitNewPassword} noValidate sx={{ mt : 1 }}>
            <CustomInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              type="password"
              icon={<Lock style={{ color: '#ccc' }} />}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt : 1 }}>
                Send Reset OTP
            </Button>
          </Box>
        </Paper>
      }
  </Container>
  )
}

export default ResetPasswordPage