import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import kelpRoutes from './routes/kelpRoutes.js';
import diveSitesRoutes from './routes/diveSitesRoutes.js';
import newSpeciesRoutes from './routes/newSpeciesRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan("dev"));

app.use('/api/kelp', kelpRoutes);
app.use('/api/dive-sites', diveSitesRoutes);
app.use('/api/new-species', newSpeciesRoutes);

if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
