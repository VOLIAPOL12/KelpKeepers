import { findDiveHistoryData, countDiveHistory } from "../models/diveHistoryModel.js";
import { query } from "../db.js";

export const getDivingHistory = async (req, res) => {
    try {
        const { userId, page = 1, limit = 10 } = req.body;
    
        const offset = (page - 1) * limit;
    
        const [diveHistoryData, total] = await Promise.all([
            findDiveHistoryData(userId, limit, offset),
            countDiveHistory(userId)
        ]);

        const enriched = await Promise.all(
            diveHistoryData.rows.map(async (row) => {
            const check = await query(
                `SELECT 1 FROM "DiveResult"
                WHERE user_id = $1 AND event_id = $2
                LIMIT 1`,
                [userId, row.event_id]
            );
    
            return {
                ...row,
                resultExists: check.rows.length > 0,
            };
            })
        );
    
        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            data: enriched,
        });
  
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getDivingHistoryByID = async (req, res) => {

}