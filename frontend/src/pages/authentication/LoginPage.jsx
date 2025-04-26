import { Avatar, Container, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import React, { useContext, useState } from "react";
import { AppContent } from "../../context/AppContext";


function LoginPage() {
    const [state, setState] = useState('Sign Up');

    const { backendUrl, setIsLoggedIn } = useContext(AppContent)

    return(
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>
                <Avatar>
                    <LockOutlinedIcon />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="email@example.com"
                            {...register('email')}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <User size={20} color="grey" />
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                        />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            {...register('password')}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <Lock size={20} color="grey" />
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                        />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label={<Typography variant="body2" sx={{ color: 'blue.100' }}>Remember me</Typography>}
                        />
                        <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: '#4fd1c5', textDecoration: 'none' }}>
                            Forgot password?
                        </Link>
                        </Box>

                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                        >
                        {isSubmitting ? <CircularProgress size={24} /> : 'Sign in'}
                        </Button>

                        <Typography variant="body2" align="center" sx={{ color: 'blue.100', mt: 4 }}>
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            style={{ fontWeight: 500, color: '#4fd1c5', textDecoration: 'none' }}
                        >
                            Register now
                        </Link>
                        </Typography>
                    </form>
                </Avatar>
            </Paper>
        </Container>
    )
}

export default LoginPage