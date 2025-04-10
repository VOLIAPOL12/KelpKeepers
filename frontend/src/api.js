import axios from 'axios';

const API_URL = '/api';


export const fetchKelpData = async () => {
    const response = await axios.get(`${API_URL}/kelp/kelp`);
    return response.data;
};

export const fetchSeaUrchinData = async () => {
    const response = await axios.get(`${API_URL}/kelp/sea-urchin`);
    return response.data;
};


export const fetchDiveSites = async () => {
    try {
        const response = await axios.get(`${API_URL}/dive-sites`);
        console.log("Dive Sites fetched successfully:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching dive sites:", error.message);
        return [];
    }
};

export const fetchSpeciesData = async (species) => {
    const response = await axios.get(`${API_URL}/new-species/${species}`);
    return response.data;
};