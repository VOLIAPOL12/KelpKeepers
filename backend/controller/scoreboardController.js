import { getLeaderboardAndUserRank } from "../models/scoreboardModel.js";

export const getLeaderboard = async (req, res) => {
  const userId = req.body.userId; // adapt depending on your auth system

  try {
    const data = await getLeaderboardAndUserRank(userId);
    res.status(200).json(data);
  } catch (err) {
    console.error('Leaderboard Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
