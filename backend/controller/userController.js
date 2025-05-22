import { fineUserByID } from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await fineUserByID(userId);

        if(!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            userData: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
                isEmailVerified: user.is_email_verified,
                createdAt: user.created_at,
                padiCertification: user.padi_certification || null,
                isPadiVerified: user.is_padi_verified || false
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
} 