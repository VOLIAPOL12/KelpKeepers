import { findDiveHistoryData, countDiveHistory } from "../models/diveHistoryModel.js";
import { query } from "../db.js";

export const getDivingHistory = async (req, res) => {
    try {
        const { userId, page = 1, limit = 10 } = req.body;
    
        const offset = (page - 1) * limit;
    
        const [diveHistoryData, total] = await Promise.all([
            findDiveHistoryData(userId, limit, offset),
            countDiveHistory(userId),
        ]);
    
        // ✅ Use result_id already returned in the query
        const enriched = diveHistoryData.rows.map((row) => ({
            ...row,
            resultExists: !!row.result_id, // true if result_id is not null/undefined
        }));
    
        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            data: enriched,
        });
    } catch (error) {
        console.error('Error retrieving dive history:', error.message);
        res.status(400).json({ success: false, message: error.message });
    }
  };