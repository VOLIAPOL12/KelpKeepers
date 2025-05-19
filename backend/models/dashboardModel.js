import { query } from '../db.js';  

export const findDashboardData = async (userId) => {
    try {
        const result = await query(`
            SELECT 
                e.event_id,
                e.title,
                e.date,
                d."Diver site" AS site_name,
                d."decimalLatitude",
                d."decimalLongitude"
            FROM eventparticipant ep
            JOIN diveevent e ON ep.event_id = e.event_id
            JOIN "Dive sites in Tasmania" d ON e.divesite_id = d.id
            WHERE ep.user_id = $1 AND e.date >= CURRENT_DATE
            ORDER BY e.date ASC
            LIMIT 1
        `, [userId]);

        return result;
    } catch (err) {
        console.error('Error adding event participant:', err.message);
        throw err;
    }
};

export const getUserDiveStats = async (userId) => {
    try {
        const result = await query(`
        SELECT 
            COUNT(*) AS total_dives,
            SUM(duration) AS total_minutes_dove,
            COUNT(*) FILTER (WHERE "found kelp" = true) AS total_kelp_found,
            COUNT(*) FILTER (WHERE "plant kelp" = true) AS total_kelp_planted,
            COUNT(*) FILTER (WHERE "remove urchin" = true) AS total_urchins_removed
        FROM "DiveResult"
        WHERE user_id = $1;
        `, [userId]);

        return result.rows[0]; // since it's a single summary row
    } catch (err) {
        console.error('Error fetching dive summary:', err.message);
        throw err;
    }
};

export const getTotalAmountOfDiveResults = async () => {
    try {
        const result = await query(`
           SELECT 
                TO_CHAR(e.date, 'YYYY-MM') AS month,
                COUNT(*) FILTER (WHERE r."found kelp" = true) AS kelp_found,
                COUNT(*) FILTER (WHERE r."plant kelp" = true) AS kelp_planted,
                COUNT(*) FILTER (WHERE r."remove urchin" = true) AS urchins_removed
            FROM "DiveResult" r
            JOIN diveevent e ON r.event_id = e.event_id
            GROUP BY month
            ORDER BY month;
        `, []);
        return result.rows;
    } catch (err) {
        console.error('Error fetching dive summary:', err.message);
        throw err;
    }
}