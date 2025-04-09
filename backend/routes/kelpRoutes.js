
// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import csv from 'csv-parser';

// const router = express.Router();

// router.get('/kelp', (req, res) => {
//     const results = [];
//     const filePath = path.resolve(__dirname, '../data/clean_kelp_each_year.csv');
//     console.log("Kelp data file path: ", filePath);
  
//     if (!fs.existsSync(filePath)) {
//         return res.status(404).send("Kelp data file not found.");
//     }
  
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//           if (results.length < 100) { 
//               results.push(data);
//           }
//       })
//       .on('end', () => res.json(results))
//       .on('error', (err) => res.status(500).json({ error: err.message }));
//   });
  
//   router.get('/sea-urchin', (req, res) => {
//     const results = [];
//     const filePath = path.resolve(__dirname, '../data/clean_sea_urchin_each_year.csv');
//     console.log("Sea Urchin data file path: ", filePath);
  
//     if (!fs.existsSync(filePath)) {
//         return res.status(404).send("Sea Urchin data file not found.");
//     }
  
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//           if (results.length < 100) { 
//               results.push(data);
//           }
//       })
//       .on('end', () => res.json(results))
//       .on('error', (err) => res.status(500).json({ error: err.message }));
//   });
  
//   module.exports = router;
  
import express from 'express';
import { pool } from '../db.js';  

const router = express.Router();


// router.get('/kelp', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM clean_kelp_each_year LIMIT 100;'); 
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });
router.get('/kelp', async (req, res) => {
    console.log("Received GET /api/kelp/kelp request");

    try {
        const result = await pool.query('SELECT * FROM clean_kelp_each_year LIMIT 100;'); 
        res.json(result.rows);
    } catch (error) {
        console.error(" Error during GET /kelp:", error); 
        res.status(500).json({ error: error.message || "Unknown error" });
    }
    
});



router.get('/sea-urchin', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clean_sea_urchin_each_year LIMIT 100;'); 
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export default router;
