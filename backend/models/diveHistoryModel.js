import { query } from '../db.js';

export const findDiveHistoryData = async (userId, limit = 10, offset = 0) => {
    try {
        const result = await query(`
            SELECT
                d.event_id,
                d.title,
                d.description,
                d.date,
                d.dive_duration,
                d.start_time,
                d.max_slots,
                d.slots_now,
                d.host_user_id,
                d.divesite_id,
                ep.joined_at
            FROM eventparticipant ep
            JOIN diveevent d ON ep.event_id = d.event_id
            WHERE ep.user_id = $1 AND d.date < CURRENT_DATE
            ORDER BY d.date DESC
            LIMIT $2 OFFSET $3;
        `, [userId, limit, offset]);
    
        return result;
    } catch (err) {
        console.error('Error retrieving dive history:', err.message);
        throw err;
    }
};

export const countDiveHistory = async (userId) => {
    try {
        const result = await query(`
        SELECT COUNT(*) FROM eventparticipant ep
        JOIN diveevent d ON ep.event_id = d.event_id
        WHERE ep.user_id = $1 AND d.date < CURRENT_DATE;
        `, [userId]);

        return parseInt(result.rows[0].count, 10);
    } catch (err) {
        console.error('Error counting dive history:', err.message);
        throw err;
    }
};