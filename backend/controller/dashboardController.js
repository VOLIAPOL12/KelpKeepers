import { findDashboardData } from "../models/dashboardModel";


export const getDashboardData = async (req, res) => {
    try {
        const {userId} = req.body;
        
        const result = await findDashboardData(userId)
        res.json({ upcomingDive: result || null });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
}