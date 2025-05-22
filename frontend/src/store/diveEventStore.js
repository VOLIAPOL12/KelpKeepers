// src/stores/diveEventStore.js
import { create } from 'zustand';
import { fetchDiveEvent } from '../api/diveEventApi';

const useDiveEventStore = create((set) => ({
  events: [],
  loading: false,
  error: null,
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchDiveEvent();
      set({ events: data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch events', loading: false });
    }
  },
}));

export default useDiveEventStore;
