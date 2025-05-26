import { addEventParticipant } from "../models/eventParticipantModel.js";
import { updateUserStatus } from "../models/userStatus.js";
import { updateActivitySlots } from "../models/eventParticipantModel.js";
import { pool } from '../db.js'; // 注意：用 pool 而不是 query

export const joinDiveEvent = async (req, res) => {
    const { userId, event_id } = req.body;

    if (!userId || !event_id) {
        return res.status(400).json({ success: false, message: 'Missing user_id or event_id' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 把 client 传下去，确保所有数据库操作都使用同一个事务连接
        const participant = await addEventParticipant({ userId, event_id }, client);
        await updateUserStatus(userId, true, event_id, client);
        await updateActivitySlots(event_id, client);

        await client.query('COMMIT');

        res.json({
            success: true,
            message: 'User successfully joined the dive event',
            participant
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Join event error:', error.message);
        res.status(500).json({ success: false, message: 'Server error while joining event' });
    } finally {
        client.release(); // 释放连接
    }
};
