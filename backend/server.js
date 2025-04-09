// import express from "express";
// import helmet from "helmet";
// import morgan from "morgan";
// import cors from "cors";
// import dotenv from "dotenv";
// import kelpRoutes from "./routes/kelpRoutes.js";  
// import diveSitesRoutes from "./routes/diveSitesRoutes.js";  

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;


// app.use(helmet());
// app.use(morgan("dev"));

// app.use('/api/kelp', kelpRoutes);
// app.use('/api/dive-sites', diveSitesRoutes);

// app.listen(PORT, () => {
//     console.log("5000");
// })

import express from 'express';
import cors from 'cors';
import kelpRoutes from './routes/kelpRoutes.js';
import diveSitesRoutes from './routes/diveSitesRoutes.js';
import newSpeciesRoutes from './routes/newSpeciesRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/kelp', kelpRoutes);
app.use('/api/dive-sites', diveSitesRoutes);
app.use('/api/new-species', newSpeciesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
