import { findDashboardData } from "../models/dashboardModel.js";


export const getDashboardData = async (req, res) => {
    try {
        const {userId} = req.body;
        
        const result = await findDashboardData(userId)
        res.json({ upcomingDive: result.rows || null });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
}