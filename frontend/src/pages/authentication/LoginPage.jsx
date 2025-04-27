import { Avatar, Container, Grid, Paper, TextField, Typography, Link, Box, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import React, { useContext, useState } from "react";
import { AppContent } from "../../context/AppContext";
import { Link as RouterLink } from 'react-router-dom'
import axios from "axios";


function LoginPage() {
    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');

    const { backendUrl, setIsLoggedIn } = useContext(AppContent);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/login', {email, password})
            console.log(data);
        } catch (error) {
            console.log(error);
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
                    <TextField placeholder="Enter username" fullWidth required autoFocus sx={{ mb: 2 }}/>
                    <TextField placeholder="Enter password" fullWidth required autoFocus type="password"/>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt : 1 }}>
                        {state}
                    </Button>
                </Box>

                <Grid container justifyContent='space-between' sx={{ mt : 1 }}>
                    <Grid item>
                        <Link component={RouterLink} to="/forgot">
                            Forgot Password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component={RouterLink} to="/register">
                            Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default LoginPage