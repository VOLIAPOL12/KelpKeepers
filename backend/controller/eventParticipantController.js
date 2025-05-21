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
export const withdrawDiveEvent = async (req, res) => {
  const { userId, event_id } = req.body;

  if (!userId || !event_id) {
    return res.status(400).json({ success: false, message: 'Missing userId or event_id' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. 从 event_participant 表中删除记录
    await client.query(
      'DELETE FROM event_participant WHERE user_id = $1 AND event_id = $2',
      [userId, event_id]
    );

    // 2. 更新用户状态为未参与
    await client.query(
      'UPDATE users SET user_status = false, event_id = NULL WHERE user_id = $1',
      [userId]
    );

    // 3. 减少活动当前 slots
    await client.query(
      'UPDATE events SET slots_now = slots_now - 1 WHERE event_id = $1 AND slots_now > 0',
      [event_id]
    );

    await client.query('COMMIT');

    res.status(200).json({ success: true, message: 'Withdraw successful' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Withdraw event error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while withdrawing from event' });
  } finally {
    client.release();
  }
};
