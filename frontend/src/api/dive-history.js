import axios from 'axios';

const API_URL = '/api';

export const fetchDiveHistory = async (page = 1, limit = 5) => {
    const response = await axios.post(
        '/api/dive-history',
        { page, limit }, // sent in request body ✅
        { withCredentials: true } // if using cookies for auth
    );

    return response.data;
};

export const submitDiveEntry = async (data) => {
    const response = await axios.post('/api/dive-data', data, {
        withCredentials: true,
    });
    return response.data;
};

export const updateDiveEntry = async (data) => {
    const response = await axios.put('/api/dive-data', data, {
        withCredentials: true,
    });
    return response.data;
}