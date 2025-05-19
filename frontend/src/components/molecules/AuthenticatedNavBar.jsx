import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from "../../context/AppContext";
import { 
    AppBar,
    Avatar,
    Box,
    Menu,
    MenuItem,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/EmojiEvents';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import navLogo from '../../assets/nav-logo.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../assets/logo.png';

const drawerWidth = 300;

const AuthenticatedNavBar = ({ children })  => {
    const navigate = useNavigate();
    const { userData, backendUri, setUserData, setIsLoggedIn } = useContext(AppContent);

    const [open, setOpen] = useState(false);

    const toggleDrawer = () => setOpen(!open);

    const navItems = [
        { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { label: 'History', icon: <HistoryIcon />, path: '/history' },
        { label: 'Scoreboard', icon: <LeaderboardIcon />, path: '/scoreboard' },
        { label: 'Create Activity', icon: <AddIcon />, path: '/create-activity' },
        { label: 'Camera', icon: <CameraAltIcon />, path: '/camera' }
    ];

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
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar 
                    position="fixed"
                    
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        bgcolor: 'lightgrey'
                    }}
                >
                    <Toolbar sx={{ minHeight: '50px', display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2, display: { sm: 'none' }}}>
                            <MenuIcon />
                        </IconButton>
                        {/* Logo */}
                        <Box
                            component="img"
                            src={navLogo}
                            alt="Logo"
                            sx={{ height: 30, cursor: 'pointer' }}
                            onClick={() => navigate('/')}
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
                            {!userData?.isAccountVerified && (<MenuItem onClick={handleVerifyEmail}>Verify Email</MenuItem>)}
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        anchor="left"
                        open={open}
                        onClose={toggleDrawer}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <Box  role="presentation" onClick={toggleDrawer}>
                        <List>
                            {navItems.map(({ label, icon, path }) => (
                            <ListItem button key={label} onClick={() => navigate(path)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItem>
                            ))}
                        </List>
                        </Box>
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        <Box sx={{p: 6}}>
                            <img src={logo}/>
                        </Box>
                        <List>
                            {navItems.map(({ label, icon, path }) => (
                            <ListItem button key={label} onClick={() => navigate(path)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    {children}
                </Box>
            </Box>
        </>
        
    )
}

export default AuthenticatedNavBar