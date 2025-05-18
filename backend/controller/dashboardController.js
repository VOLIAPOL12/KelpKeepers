import { findDashboardData } from "../models/dashboardModel.js";


export const getDashboardData = async (req, res) => {
    try {
        const {userId} = req.body;
        console.log(userId);
        
        const result = await findDashboardData(userId)
        console.log(result.rows);
        res.json({ upcomingDive: result.rows || null });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
}