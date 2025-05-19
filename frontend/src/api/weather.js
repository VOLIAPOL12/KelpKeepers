import axios from "axios";

export const fetchDashboardForecast = async (latitude, longitude, start_date, end_date) => {

    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude,
            longitude,
            start_date: start_date,
            end_date: end_date,
            daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "uv_index_max"],
        },
        withCredentials: false
    });
 
    return response.data;
}

export const fetchDashboardMarine = async (latitude, longitude, start_date, end_date) => {
    const response = await axios.get('https://marine-api.open-meteo.com/v1/marine', {
        params: {
            latitude,
            longitude,
            start_date: start_date,
            end_date: end_date, 
            hourly: ["wave_height", "swell_wave_height", "wave_period", "ocean_current_velocity", "ocean_current_direction"],
        },
        withCredentials: false
    });
 
    return response.data;
}