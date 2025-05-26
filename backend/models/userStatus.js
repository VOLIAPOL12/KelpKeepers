import { pool } from '../db.js'

export const updateUserStatus = async (userId, user_status, joined_event_id, client) => {
    try {
        const result = await client.query(
            `UPDATE "User"
             SET user_status = $1, joined_event_id = $2
             WHERE user_id = $3 RETURNING *`,
            [user_status, joined_event_id, userId]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error updating user status:', err);
        throw err;
    }
};
