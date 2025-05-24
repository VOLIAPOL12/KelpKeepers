import { query } from '../db.js';  // 从 db.js 导入 query

// 插入活动参与者记录
export const addEventParticipant = async ({ userId, event_id }) => {
    try {
        // 使用 query 函数来执行 SQL 查询
        const result = await query(
            `INSERT INTO eventparticipant (user_id, event_id, joined_at) 
            VALUES ($1, $2, NOW()) RETURNING *`,
            [userId, event_id]
        );
        return result.rows[0];  // 返回插入的记录
    } catch (err) {
        console.error('Error adding event participant:', err);
        throw err;  // 如果出错，抛出错误
    }
};

// 更新活动的 slots_now
export const updateActivitySlots = async (event_id) => {
    try {
        // 使用 query 函数来执行 SQL 查询
        await query(
            `UPDATE diveevent
            SET slots_now = slots_now + 1
            WHERE event_id = $1`,
            [event_id]
        );
    } catch (err) {
        console.error('Error updating activity slots:', err);
        throw err;  // 如果出错，抛出错误
    }
};
