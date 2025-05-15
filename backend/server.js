import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// 路由导入
import kelpRoutes from './routes/kelpRoutes.js';
import diveSitesRoutes from './routes/diveSitesRoutes.js';
import newSpeciesRoutes from './routes/newSpeciesRoutes.js';
import divingActivitiesRoutes from './routes/divingActivitiesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import kelpDetectionRouter from "./routes/kelpDetectionRouter.js";
import ratingsRouter from './routes/ratingRoutes.js'; // ⭐️ 这是你新增的评分接口

// 初始化 dotenv
dotenv.config();

// 处理 __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建 app
const app = express();
const PORT = process.env.PORT || 3000;

// CORS 设置
const allowedOrigins = ['http://localhost:5137'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// 中间件
app.use(express.json());
app.use(cookieParser());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

// API 路由
app.use('/api/kelp', kelpRoutes);
app.use('/api/dive-sites', diveSitesRoutes);
app.use('/api/new-species', newSpeciesRoutes);
app.use('/api/diving-activities', divingActivitiesRoutes);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/kelp-detection', kelpDetectionRouter);
app.use('/api/ratings', ratingsRouter); // ⭐️ 注册评分路由

// 前端部署支持
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
