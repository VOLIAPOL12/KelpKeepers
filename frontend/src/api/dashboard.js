import axios from 'axios';

const API_URL= '/api';

export const fetchDashboardData = async () => {
    const response = await axios.get(`${API_URL}/dashboard-data`);
    return response.data
}