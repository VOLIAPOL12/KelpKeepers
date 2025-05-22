import axios from 'axios';

const API_URL= '/api';

export const fetchDiveSites = async () => {
    const response = await axios.get(`${API_URL}/dive-sites`);
    return response.data;
}