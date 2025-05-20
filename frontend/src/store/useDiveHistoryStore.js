import { create } from "zustand";
import { fetchDiveHistory } from "../api/dive-history";

const useDivingHistoryStore = create((set) => ({
    diveHistory: [],
    total: 0,
    page: 1,
    limit: 5,
    loading: false,
    error: null,
  
    loadDiveHistory: async (page = 1, limit = 5) => {
        set({ loading: true, error: null });
        try {
            const res = await fetchDiveHistory(page, limit);
            set({
            diveHistory: res.data,
            total: res.total,
            page: res.page,
            limit: res.limit,
            loading: false,
            });
        } catch (error) {
            set({ error: 'Failed to load dive history', loading: false });
        }
    },
  }));

  export default useDivingHistoryStore;