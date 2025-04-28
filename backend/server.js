import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import kelpRoutes from './routes/kelpRoutes.js';
import diveSitesRoutes from './routes/diveSitesRoutes.js';
import newSpeciesRoutes from './routes/newSpeciesRoutes.js';
import divingActivitiesRoutes from './routes/divingActivitiesRoutes.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoutes.js";


dotenv.config();

const allowedOrigins = ['http://localhost:5137']

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser());

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan("dev"));

app.use('/api/kelp', kelpRoutes);
app.use('/api/dive-sites', diveSitesRoutes);
app.use('/api/new-species', newSpeciesRoutes);
app.use('/api/diving-activities', divingActivitiesRoutes);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
