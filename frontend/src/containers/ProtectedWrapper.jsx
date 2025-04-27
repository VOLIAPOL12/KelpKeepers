import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext'; // adjust path if different

const ProtectedWrapper = ({ children }) => {
    const { isLoggedIn } = useContext(AppContent);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
        navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedWrapper;
