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
    Typography,
    Tooltip,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/EmojiEvents';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import navLogo from '../../assets/nav-logo.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../assets/logo.png';
import LobbyIcon from '@mui/icons-material/FormatListBulleted';

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
        { label: 'Camera', icon: <CameraAltIcon />, path: '/camera' },
        { label: 'Dive Lobby', icon: <LobbyIcon />, path: '/lobby' },
        { label: 'Profile', icon: <PersonIcon  />, path: '/profile' }
    ];

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUri + '/api/auth/logout');

            data.success && setIsLoggedIn(false);
            data.success && setUserData(false);
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ textAlign: 'center', py: 2 }}>
                                <Avatar sx={{ margin: '0 auto', bgcolor: 'black' }}>
                                    {userData.name?.[0]?.toUpperCase()}
                                </Avatar>
                                <Typography variant="subtitle2" mt={1}>
                                    {userData.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {userData.email}
                                </Typography>
                            </Box>
                            <List sx={{ flexGrow: 1 }}>
                                {navItems.map(({ label, icon, path }) =>{
                                    const isRestricted = label === 'Create Activity' && !userData?.isPadiVerified;

                                    return (
                                        <ListItem
                                        button
                                        key={label}
                                        onClick={() => !isRestricted && navigate(path)}
                                        disabled={isRestricted}
                                        >
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText
                                            primary={label}
                                            primaryTypographyProps={isRestricted ? { color: 'text.disabled' } : {}}
                                        />
                                        </ListItem>
                                    );
                                })}
                            </List>

                            <Box sx={{ p: 2, borderTop: '1px solid #ccc' }}>
                                <ListItem button onClick={handleLogout}>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout" />
                                </ListItem>
                            </Box>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ textAlign: 'center', py: 2 }}>
                                <Avatar sx={{ margin: '0 auto', bgcolor: 'black' }}>
                                    {userData.name?.[0]?.toUpperCase()}
                                </Avatar>
                                <Typography variant="subtitle2" mt={1}>
                                    {userData.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {userData.email}
                                </Typography>
                            </Box>
                            <List sx={{ flexGrow: 1 }}>
                            {navItems.map(({ label, icon, path }) => {
                                const isRestricted = label === 'Create Activity' && !userData?.isPadiVerified;

                                return (
                                    <Tooltip title={isRestricted ? 'PADI verification required' : ''}>
                                        <ListItem
                                        button
                                        key={label}
                                        onClick={() => !isRestricted && navigate(path)}
                                        disabled={isRestricted}
                                        >
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText
                                                primary={label}
                                                primaryTypographyProps={isRestricted ? { color: 'text.disabled' } : {}}
                                            />
                                        </ListItem>
                                    </Tooltip>
                                );
                            })}

                            </List>

                            <Box sx={{ p: 2, borderTop: '1px solid #ccc' }}>
                                <ListItem button onClick={handleLogout}>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout" />
                                </ListItem>
                            </Box>
                        </Box>

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

export default AuthenticatedNavBar;