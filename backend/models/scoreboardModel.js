import { query } from '../db.js';

export const getLeaderboardAndUserRank = async (userId) => {
  const baseCTE = `
    WITH user_scores AS (
      SELECT
        u.user_id,
        u.name,
        FLOOR(COALESCE(SUM(dr.duration), 0) / 60) AS duration_score,
        FLOOR(COUNT(*) FILTER (WHERE dr."found kelp" = TRUE) / 3) AS found_score,
        COUNT(*) FILTER (WHERE dr."plant kelp" = TRUE) AS planted_score,
        FLOOR(COUNT(*) FILTER (WHERE dr."remove urchin" = TRUE) / 2) AS urchin_score,
        FLOOR(COALESCE(SUM(dr.duration), 0) / 60)
        + FLOOR(COUNT(*) FILTER (WHERE dr."found kelp" = TRUE) / 3)
        + COUNT(*) FILTER (WHERE dr."plant kelp" = TRUE)
        + FLOOR(COUNT(*) FILTER (WHERE dr."remove urchin" = TRUE) / 2) AS total_score
      FROM "User" u
      LEFT JOIN "DiveResult" dr ON u.user_id = dr.user_id
      GROUP BY u.user_id
    ),
    ranked_scores AS (
      SELECT *,
             RANK() OVER (ORDER BY total_score DESC) AS rank
      FROM user_scores
    )
  `;

  // Get top 10
  const topQuery = `
    ${baseCTE}
    SELECT user_id, name, total_score, rank
    FROM ranked_scores
    ORDER BY total_score DESC
    LIMIT 10;
  `;
  const top10Result = await query(topQuery);

  // Get rank of current user
  const currentUserQuery = `
    ${baseCTE}
    SELECT user_id, name, total_score, rank
    FROM ranked_scores
    WHERE user_id = $1;
  `;
  const currentUserResult = await query(currentUserQuery, [userId]);

  return {
    top10: top10Result.rows,
    currentUser: currentUserResult.rows[0] || null
  };
};