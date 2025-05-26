import { create } from 'zustand';
import axios from 'axios';

const useScoreboardStore = create((set) => ({
  top10: [],
  currentUser: null,
  loading: false,
  error: null,

  fetchLeaderboard: async (userId) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get('/api/scoreboard', {
        data: { userId } // only needed if not auto-resolved by token
      });

      set({
        top10: res.data.top10,
        currentUser: res.data.currentUser,
        loading: false,
        error: null
      });
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      set({
        loading: false,
        error: err?.response?.data?.message || 'Failed to load leaderboard'
      });
    }
  }
}));

export default useScoreboardStore;
