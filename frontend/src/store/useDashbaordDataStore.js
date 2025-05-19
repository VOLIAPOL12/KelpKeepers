import { create } from 'zustand';
import { fetchDashboardData } from "../api/dashboard";

const useDashboardDataStore = create((set) => ({
  dashboardData: null,
  error: null,
  loadDashboardData: async () => {
    set({ loading: true });
    try {
      const data = await fetchDashboardData();
      set({ dashboardData: data });
    } catch (err) {
      set({ error: "Failed to load dashboard data" });
    } finally {
      set({ loading: false });
    }
  }
}));

export default useDashboardDataStore;
