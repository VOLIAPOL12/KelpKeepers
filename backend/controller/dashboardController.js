import { findDashboardData, getUserDiveStats, getTotalAmountOfDiveResults } from "../models/dashboardModel.js";


export const getDashboardData = async (req, res) => {
    try {
        const {userId} = req.body;
        
        const dashboardData = await findDashboardData(userId);
        const userDiveStatsData = await getUserDiveStats(userId);
        const totalAmountOfDiveResults = await getTotalAmountOfDiveResults();
        res.json({
            upcomingDive: dashboardData.rows || null,
            total_dives: userDiveStatsData.total_dives || null,
            total_minutes_dove: userDiveStatsData.total_minutes_dove || null,
            total_kelp_found: userDiveStatsData.total_kelp_found || null,
            total_kelp_planted: userDiveStatsData.total_kelp_planted || null,
            total_urchins_removed: userDiveStatsData.total_urchins_removed || null,
            global_data: totalAmountOfDiveResults || null
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
}