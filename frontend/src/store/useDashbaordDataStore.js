import { create } from 'zustand';
import { fetchDashboardData } from "../api/dashboard";
import axios from 'axios';

const useDashboardDataStore = create((set) => ({
  dashboardData: null,
  weather: null,
  loading: false,
  error: null,

  loadDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchDashboardData();
      set({ dashboardData: data });

      const upcoming = data?.upcomingDive;
      if (upcoming?.decimalLatitude && upcoming?.decimalLongitude && upcoming?.date) {
        // Ensure date is in YYYY-MM-DD format and offset by +1 day (Open-Meteo constraint)
        const diveDate = new Date(upcoming.date);
        const startDate = new Date(diveDate);
        const endDate = new Date(diveDate);
        startDate.setDate(startDate.getDate());
        endDate.setDate(endDate.getDate() + 1);

        const formattedStart = startDate.toISOString().split('T')[0];
        const formattedEnd = endDate.toISOString().split('T')[0];

        const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: upcoming.decimalLatitude,
            longitude: upcoming.decimalLongitude,
            start_date: formattedStart,
            end_date: formattedEnd,
            daily: 'temperature_2m_max,precipitation_sum',
            timezone: 'Australia/Sydney',
          },
          withCredentials: false,
        });

        const daily = weatherRes.data?.daily;
        console.log(weatherRes);
        if (daily && daily.time?.length > 0) {
          set({ weather: {
            date: daily.time[0],
            maxTemp: daily.temperature_2m_max[0],
            precipitation: daily.precipitation_sum[0],
          }});
        } else {
          set({ weather: null });
        }
      } else {
        set({ weather: null });
      }

      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to load dashboard data', loading: false });
    }
  },
}));

export default useDashboardDataStore;
