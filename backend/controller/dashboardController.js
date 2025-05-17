

export const getDashboardData = async (req, res) => {
    try {
        const {userId} = req.body;
        
        const user = await findById(userId);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
}