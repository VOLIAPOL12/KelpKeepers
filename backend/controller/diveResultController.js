import { findDiveResultData } from "../models/diveResultModel.js";


export const getDiveResultData = async (req, res) => {
    try {
        const {userId} = req.body;
        
        const result = await findDiveResultData(userId)
        res.status(200).json({ diveResultData: result.rows || null });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
}