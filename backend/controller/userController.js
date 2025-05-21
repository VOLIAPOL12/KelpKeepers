import { findById, updateUserStatus } from "../models/userModel.js";

// 获取用户数据
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body; // 从请求中获取 userId

        const user = await findById(userId);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            userData: {
                user_id: user.user_id,
                name: user.name,
                isAccountVerified: user.is_email_verified,
                user_status: user.user_status, // 确保这里有 user_status 字段
                joined_event_id: user.joined_event_id  // 确保这里有 joined_event_id 字段
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

        // 如果用户状态为 true 且请求的 status 为 false（表示退出活动）
        if (user.user_status === true && status === false) {
            // 更新为未参与状态，清除 joined_event_id
            const updatedUser = await updateUserStatus(userId, false, null);
            return res.json({
                success: true,
                message: 'User successfully left the activity',
                userData: updatedUser
            });
        }

        // 如果用户状态为 false 且请求的 status 也是 false（表示没有更改）
        if (user.user_status === false && status === false) {
            return res.status(400).json({ success: false, message: "You are not currently joined to any activity." });
        }

        // 如果用户没有加入活动，尝试加入活动
        if (status === true) {
            // 更新用户状态为 true，设置活动 ID
            const updatedUser = await updateUserStatus(userId, true, req.body.joined_event_id);
            return res.json({
                success: true,
                message: 'User successfully joined the activity',
                userData: updatedUser
            });
        }

        // 默认情况（如果没有匹配的情况，返回错误）
        return res.status(400).json({ success: false, message: "Invalid status update request" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
