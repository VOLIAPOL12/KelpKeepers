import { query } from '../db.js';

export const findDiveResultData = async (userId) => {
    try {
        const result = await query(`
        SELECT 
            e.event_id,
            e.title,
            e.date,
            d."Diver site" AS site_name,
            d."decimalLatitude",
            d."decimalLongitude",
            r."duration",
            r."found kelp",
            r."plant kelp",
            r."remove urchin"
        FROM "DiveResult" r
        JOIN diveevent e ON r.event_id = e.event_id
        JOIN "Dive sites in Tasmania" d ON e.divesite_id = d.id
        WHERE r.user_id = $1
        ORDER BY e.date DESC
        `, [userId]);

        return result;
    } catch (err) {
        console.error('Error fetching dive results:', err.message);
        throw err;
    }
};