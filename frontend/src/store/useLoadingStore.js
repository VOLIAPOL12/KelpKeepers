import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}));

export default useLoadingStore;
