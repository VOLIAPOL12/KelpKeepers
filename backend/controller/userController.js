import { fineUserByID, updateUserStatus, findById } from "../models/userModel.js";

// 获取用户数据
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body; // 从请求中获取 userId

        const user = await fineUserByID(userId);

        if (!user) {
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
                user_status: user.user_status, // 确保这里有user_status字段
                joined_event_id: user.joined_event_id,  // 确保这里有joined_event_id字段
                createdAt: user.created_at,
                padiCertification: user.padi_certification || null,
                isPadiVerified: user.is_padi_verified || false
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 更新用户状态
export const updateUserStatusController = async (req, res) => {
    try {
        const { userId, status } = req.body; // 获取请求体中的 userId 和 status

        const user = await findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        // 检查用户是否已加入其他活动（即 user_status 为 true）
        if (user.status === true) {
            return res.status(400).json({ success: false, message: "You have already joined an activity." });
        }

        // 更新用户状态
        const updatedUser = await updateUserStatus(userId, status);

        res.json({
            success: true,
            message: 'User status updated successfully',
            userData: updatedUser
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
