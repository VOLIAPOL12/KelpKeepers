import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from "../../context/AppContext";
import { AppBar, Avatar, Box, Menu, MenuItem, Toolbar } from '@mui/material';
import navLogo from '../../assets/nav-logo.png'
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthenticatedNavBar = () => {
    const navigate = useNavigate();
    const { userData, backendUri, setUserData, setIsLoggedIn } = useContext(AppContent);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
    setAnchorEl(null);
    };

    const handleVerifyEmail = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUri + '/api/auth/send-verify-otp');

            if(data.success) {
                navigate('/email-verify');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleProfile = () => {
        handleCloseMenu();
        navigate('/profile');
    };

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUri + '/api/auth/logout');

            data.success && setIsLoggedIn(false);
            data.success && setUserData(false);
            handleCloseMenu();
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <AppBar 
            position="static" 
            elevation={0} 
            sx={{ 
                backgroundColor: '#ffffff', 
                color: 'black',
                height: 50,
                justifyContent: 'center',
            }}
            >
            <Toolbar sx={{ minHeight: '50px', display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Box
                component="img"
                src={navLogo}
                alt="Logo"
                sx={{ height: 30, cursor: 'pointer' }}
                onClick={() => navigate('/dashboard')}
                />

                {/* Avatar */}
                <Avatar sx={{ bgcolor: 'black', width: 32, height: 32, fontSize: 14 }} onClick={handleOpenMenu}>
                    {userData.name ? userData.name[0].toUpperCase() : <></>}
                </Avatar>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                >
                    {console.log(userData)}
                    {!userData?.isAccountVerified && (<MenuItem onClick={handleVerifyEmail}>Verify Email</MenuItem>)}
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default AuthenticatedNavBar