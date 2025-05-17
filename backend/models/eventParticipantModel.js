import { query } from '../db.js';

export const addEventParticipant = async ({ user_id, event_id }) => {
    try {
        const result = await query(
        `INSERT INTO eventparticipant (user_id, event_id, joined_at)
        VALUES ($1, $2, NOW())
        RETURNING *`,
        [user_id, event_id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error adding event participant:', err.message);
        throw err;
    }
};