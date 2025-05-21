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
export const updateActivitySlots = async (event_id, change) => {
    try {
        // 确保 change 是合法的（只能是 1 或 -1）
        if (change !== 1 && change !== -1) {
            throw new Error("Invalid change value. It should be either 1 or -1.");
        }

        // 使用 query 函数来执行 SQL 查询，增加或减少 slots_now
        await query(
            `UPDATE diveevent
            SET slots_now = slots_now + $1
            WHERE event_id = $2`,
            [change, event_id] // change 是 1 或 -1
        );
    } catch (err) {
        console.error('Error updating activity slots:', err);
        throw err;  // 如果出错，抛出错误
    }
};
