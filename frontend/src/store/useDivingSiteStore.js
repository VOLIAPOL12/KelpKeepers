import { create } from "zustand";
import { fetchDiveSites } from "../api/dive-site";

const useDivingSiteStore = create((set) => ({
    diveSites: [],
    loading: false,
    error: null,
  
    loadDiveSites: async () => {
      set({ loading: true, error: null });
      try {
        const sites = await fetchDiveSites();
        set({ diveSites: sites, loading: false });
      } catch (error) {
        set({ error: 'Failed to load dive sites', loading: false });
      }
    },
  }));
  
  export default useDivingSiteStore;