import { Avatar, Container, Grid, Paper, TextField, Typography, Link, Box, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import React, { useContext, useState } from "react";
import { AppContent } from "../../context/AppContext";
import { Link as RouterLink } from 'react-router-dom'
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

    const { backendUri, setIsLoggedIn } = useContext(AppContent);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;

            if(state === "Sign Up") {
                const { data } = await axios.post(backendUri + '/api/auth/register', {name, email, password});
                if(data.success) {
                    setIsLoggedIn(true);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUri + '/api/auth/login', {email, password});
                if(data.success) {
                    setIsLoggedIn(true);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            }
            
        } catch (error) {
            toast.error(data.message);
        }
    }

    return(
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>
                <Avatar sx={{ mx: 'auto', bgColor: 'secondary.main', textAlign: "center",}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5' sx={{textAlign: "center"}}>
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt : 1 }}>
                    {state === 'Sign Up' && (
                        <CustomInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            icon={<Person style={{ color: '#ccc' }} />}
                        />
                    )}
                    <CustomInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        icon={<Email style={{ color: '#ccc' }} />}
                    />
                    <CustomInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        icon={<Lock style={{ color: '#ccc' }} />}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt : 1 }}>
                        {state}
                    </Button>
                </Box>

                <Grid container justifyContent='space-between' sx={{ my : 1 }}>
                    <Grid item>
                        <Link component={RouterLink} to="/forgot">
                            Forgot Password?
                        </Link>
                    </Grid>
                </Grid>

                { state === 'Sign Up' ? (
                    <p className="text-muted">
                        Already have an account?{' '}
                        <span className="text-primary" role="button" style={{ cursor: 'pointer', textDecoration: 'underline', color: "blue" }} onClick={() => setState('Login')}>
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className="text-muted">
                        Don't have an account?{' '}
                        <span className="text-primary" role="button" style={{ cursor: 'pointer', textDecoration: 'underline', color: "blue" }} onClick={() => setState('Sign Up')}>
                            Sign up
                        </span>
                    </p>
                )}
            </Paper>
        </Container>
    )
}

export default LoginPage