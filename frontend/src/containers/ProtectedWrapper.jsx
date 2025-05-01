import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext'; // adjust path if different
import AuthenticatedNavBar from '../components/molecules/AuthenticatedNavBar';
import { Box, CircularProgress } from '@mui/material';

const ProtectedWrapper = ({ children }) => {
    const { isLoggedIn, loading } = useContext(AppContent);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) { // <-- only after loading finishes
            if (!isLoggedIn) {
                navigate('/login');
            }
        }
    }, [isLoggedIn, loading, navigate]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress/>
            </Box>
        )
    }

    if (!isLoggedIn) {
        return null; // return nothing if user isn't logged in
    }

    return (
        <>
            <AuthenticatedNavBar />
            {children}
        </>
    );
};


export default ProtectedWrapper;
