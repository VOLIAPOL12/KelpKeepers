import { findById } from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await findById(userId);

        if(!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.is_account_verified,
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
} 