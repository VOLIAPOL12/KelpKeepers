import { query } from '../db.js';  

export const findDashboardData = async (req, res) => {
    const userId = req.user.id; // adjust if using JWT or sessions

    try {
        const result = await pool.query(`
        SELECT 
            e.*,
            d."Diver site" AS name,
            d."decimalLatitude",
            d."decimalLongitude"
        FROM diveevent e
        JOIN "Dive sites in Tasmania" d ON e.divesite_id = d.id
        JOIN diver_event de ON e.event_id = de.event_id
        WHERE de.user_id = $1
            AND e.date >= CURRENT_DATE
        ORDER BY e.date ASC
        LIMIT 1
        `, [userId]);

        res.json({ upcomingDiveEvent: result.rows[0] || null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load dashboard data' });
    }
};
