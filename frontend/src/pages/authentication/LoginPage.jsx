import {
    Avatar,
    Container,
    Grid,
    Paper,
    Typography,
    Link,
    Box,
    Button
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useContext, useState } from "react";
import { AppContent } from "../../context/AppContext";
import { Link as RouterLink } from 'react-router-dom';
import { Person, Lock, Email } from '@mui/icons-material';
import axios from "axios";
import CustomInput from "../../components/atoms/CustomInput";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function LoginPage() {
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { backendUri, setIsLoggedIn, getUserData, getAuthState } = useContext(AppContent);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;

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
                                onClick={() => setState('Sign Up')}
                            >
                                Sign up
                            </Box>
                        </>
                    )}
                </Typography>
            </Paper>
        </Container>
    );
}

export default LoginPage;
