import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext()

export const AppContextProvider = (props) => {

    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUri + '/api/auth/is-auth');
            if(data.sucess) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch(error) {
            toast.error(error.message);
        }
    }

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
    })

    const value = {
        backendUri,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}