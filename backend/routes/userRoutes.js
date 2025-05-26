import express from 'express';
import { getUserData, updateUserStatusController } from '../controller/userController.js';
import userAuth from '../middleware/userAuth.js'; // 确保用户认证中间件

const userRouter = express.Router();

// 获取用户数据
userRouter.get('/data', userAuth, getUserData);

// 更新用户状态
userRouter.put('/status', userAuth, updateUserStatusController); // 添加更新用户状态的路由

export default userRouter;
