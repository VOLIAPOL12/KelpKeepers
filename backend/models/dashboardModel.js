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
