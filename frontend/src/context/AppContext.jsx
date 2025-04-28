import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext()

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUri + '/api/auth/is-auth');
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            !firstLoad && toast.error(error.message);
            setFirstLoad(false);
            setIsLoggedIn(false); // if error, no user
        } finally {
            setLoading(false); // <-- finally always stop loading
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUri + '/api/user/data');
            
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])

    const value = {
        backendUri,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
        loading, setLoading, getAuthState
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}