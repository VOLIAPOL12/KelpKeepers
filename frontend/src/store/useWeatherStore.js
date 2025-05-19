import { create } from 'zustand';
import { fetchDashboardForecast, fetchDashboardMarine } from '../api/weather';

const useWeatherStore = create((set) => ({
    forecast: null,
    marine: null,
    error: null,
    loadForecast: async (lat, lon, diveData) => {
        const start = new Date(diveData.date);
        const end = new Date(diveData.date);
        start.setDate(start.getDate());
        end.setDate(end.getDate() + 1);

        const startStr = start.toISOString().split('T')[0];
        const endStr = end.toISOString().split('T')[0];

        try {
            const forecastData = await fetchDashboardForecast(lat, lon, startStr, endStr);
            const daily = forecastData.daily;
            const daily_units = forecastData.daily_units;
            if (daily && daily.time && daily.time.length > 0) {
                const forecast = {
                date: daily.time[0],
                temperatureMax: {
                    value: daily.temperature_2m_max[0],
                    unit: daily_units.temperature_2m_max || '°C'
                },
                temperatureMin: {
                    value: daily.temperature_2m_min[0],
                    unit: daily_units.temperature_2m_min || '°C'
                },
                uvIndexMax: daily.uv_index_max ? daily.uv_index_max[0] : null,
                weatherCode: getWeatherDescription(daily.weather_code[0])
                };
        
                set({ forecast });
            } else {
                set({ forecast: null });
            }
        } catch (error) {
            console.error('Failed to load forecast:', error);
            set({ forecast: null });
        }

    },
    loadMarine: async (lat, lon, diveData) => {
        const start = new Date(diveData.date);
        const end = new Date(diveData.date);
        start.setDate(start.getDate());
        end.setDate(end.getDate() + 1);
    
        const startStr = start.toISOString().split('T')[0];
        const endStr = end.toISOString().split('T')[0];
    
        try {
        const marine = await fetchDashboardMarine(lat, lon, startStr, endStr);
        const hourly = marine.hourly;
        const units = marine.hourly_units;
    
        const noonIndex = hourly.time.findIndex(t => t.includes('T12:00'));
    
        // Fallback: First index with non-null wave height
        let fallbackIndex = hourly.wave_height.findIndex(val => val !== null);
        const index = noonIndex !== -1 ? noonIndex : fallbackIndex;
        if (index !== -1) {
            const marineSnapshot = {
            time: hourly.time[index],
            waveHeight: {
                value: hourly.wave_height[index] ? hourly.wave_height[index] : "n/a",
                unit: units.wave_height || 'm'
            },
            wavePeriod: {
                value: hourly.wave_period[index] ? hourly.wave_period[index] : "n/a",
                unit: units.wave_period || 's'
            },
            swellWaveHeight: {
                value: hourly.swell_wave_height[index] ? hourly.swell_wave_height[index] : "n/a",
                unit: units.swell_wave_height || 'm'
            },
            oceanCurrentDirection: {
                value: hourly.ocean_current_direction[index] ? hourly.ocean_current_direction[index] : "n/a",
                unit: units.ocean_current_direction || '°'
            },
            oceanCurrentVelocity: {
                value: hourly.ocean_current_velocity[index] ? hourly.ocean_current_velocity[index] : "n/a",
                unit: units.ocean_current_velocity || 'km/h'
            }
            };
    
            set({ marine: marineSnapshot });
        } else {
            set({ marine: null });
        }
    
        } catch (error) {
        console.error("Marine data error:", error);
        set({ marine: null });
        }
    }
}));

const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear sky';
    if (code >= 1 && code <= 3) return 'Partly cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 57) return 'Drizzle';
    if (code >= 61 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 85 && code <= 86) return 'Snow showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Unknown';
};

export default useWeatherStore;
