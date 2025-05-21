import {
  Avatar,
  Container,
  Grid,
  Paper,
  Typography,
  Link,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useContext, useEffect, useState } from "react";
import { AppContent } from "../../context/AppContext";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Person, Lock, Email, ArrowBack } from '@mui/icons-material';
import axios from "axios";
import CustomInput from "../../components/atoms/CustomInput";
import { toast } from 'react-toastify';
import bgImage from '../../assets/images/pagebackground.jpg';

function LoginPage() {
  const location = useLocation();
  const isLogin = location.state?.login ?? false;
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const navigate = useNavigate();
  const { backendUri, setIsLoggedIn, getUserData, getAuthState } = useContext(AppContent);

  useEffect(() => {
    if (isLogin) {
      setState('Login');
    } else {
      setState('Sign Up');
      setShowTerms(true);
    }
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    if (state === "Sign Up" && !agreed) {
      toast.error('You must agree to the terms and conditions');
      return;
    }

    if (state === 'Sign Up' && !name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    try {
      if (state === "Sign Up") {
        const role = "diver";
        const { data } = await axios.post(backendUri + '/api/auth/register', { name, email, password, role });
        if (data.success) {
          setIsLoggedIn(true);
          await getAuthState();
          await getUserData();
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUri + '/api/auth/login', { email, password });
        if (data.success) {
          setIsLoggedIn(true);
          getAuthState();
          getUserData();
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        position: 'relative',
        p: 2
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 400,
          width: '100%',
          px: 4,
          py: 6,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textAlign: 'center',
        }}
      >
        <Avatar sx={{ mx: 'auto', bgcolor: 'primary.main', mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ fontWeight: 600 }}>
          {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
        </Typography>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          {state === 'Sign Up' && (
            <CustomInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              icon={<Person sx={{ color: 'text.secondary' }} />}
            />
          )}
          <CustomInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            icon={<Email sx={{ color: 'text.secondary' }} />}
          />
          <CustomInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            icon={<Lock sx={{ color: 'text.secondary' }} />}
          />

          {state === 'Sign Up' && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                id="terms-checkbox"
                style={{ marginRight: 8 }}
              />
              <Typography variant="body2" component="label" htmlFor="terms-checkbox">
                I agree to the{' '}
                <Box
                  component="span"
                  onClick={() => setShowTerms(true)}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Terms and Conditions
                </Box>
              </Typography>
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 20px rgba(0,0,0,0.2)',
              },
            }}
          >
            {state}
          </Button>
        </Box>

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link component={RouterLink} to="/forgot" underline="hover" color="primary">
              Forgot Password?
            </Link>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 500,
                }}
                onClick={() => setState('Login')}
              >
                Login here
              </Box>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 500,
                }}
                onClick={() => {
                  setState('Sign Up');
                  setShowTerms(true);
                }}
              >
                Sign up
              </Box>
            </>
          )}
        </Typography>

        {/* Back to Home */}
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 4,
            fontWeight: 'bold',
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
            }
          }}
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Paper>

      {/* Terms & Conditions Dialog */}
      <Dialog open={showTerms} onClose={() => setShowTerms(false)} maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 3,
            boxShadow: 6,
            p: 2
          }
        }}
      >
        <DialogTitle>
          Terms and Conditions
          <IconButton
            aria-label="close"
            onClick={() => setShowTerms(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-line',
              fontSize: '1.05rem',
              textAlign: 'justify',
              lineHeight: 1.8,
            }}
          >
            KelpKeepers is dedicated to raising awareness about the significance of kelp forests in Australia and promoting community involvement in their restoration. While we provide information and facilitate connections among divers interested in sea urchin removal to aid kelp recovery, participants must ensure they comply with all relevant local, state, and federal laws, including obtaining necessary permits and adhering to safety regulations.

            By engaging with our platform, users acknowledge their responsibility to act within legal frameworks and understand that KelpKeepers does not assume liability for individual actions undertaken through events organized via our website.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowTerms(false);
              setAgreed(true);
            }}
            variant="contained"
            sx={{ fontWeight: 'bold' }}
          >
            I AGREE
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default LoginPage;
