import axios from 'axios';

const API_URL = '/api';

export const fetchDiveEvent = async() => {
    try {
        const response = await axios.get(`${API_URL}/diving-activities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dive events:', error);
        return [];
    }
}