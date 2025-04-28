
// import express from 'express';
// import { pool } from '../db.js';  

// const router = express.Router();


// router.get('/kelp', async (req, res) => {
//     console.log("Received GET /api/kelp/kelp request");
//     console.log("🔥 GET /api/kelp/kelp was hit!");


//     try {
//         const result = await pool.query('SELECT * FROM clean_kelp_each_year LIMIT 1000'); 
//         res.json(result.rows);
//     } catch (error) {
//         console.error(" Error during GET /kelp:", error); 
//         res.status(500).json({ error: error.message || "Unknown error" });
//     }
    
// });



// router.get('/sea-urchin', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM clean_sea_urchin_each_year LIMIT 1000;'); 
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });

// export default router;


// import express from 'express';
// import { pool } from '../db.js'; 

// const router = express.Router();

// async function fetchAndSendDataGrouped(tableName, req, res) {
//   try {
//     console.log(`🔥 Fetching grouped data from ${tableName}`);

//     const limitParam = parseInt(req.query.limit, 10);
//     const limit = isNaN(limitParam) ? null : limitParam;

//     const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY year ASC`);

//     let allData = result.rows;

//     if (limit) {
//       allData = allData.slice(0, limit); 
//     }

//     const grouped = {};
//     for (const row of allData) {
//       const year = row.year;
//       if (!grouped[year]) grouped[year] = [];
//       grouped[year].push(row);
//     }

//     const selectedData = [];
//     let carryOver = 0; 

//     const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b));

//     for (const year of sortedYears) {
//       const rows = grouped[year];
//       const needed = 33 + carryOver;
//       const picked = rows.slice(0, needed);
//       selectedData.push(...picked);

//       carryOver = Math.max(0, needed - picked.length); 
//     }

//     res.json(selectedData);

//   } catch (error) {
//     console.error(`Error during fetching from ${tableName}:`, error);
//     res.status(500).json({ error: error.message || "Unknown error" });
//   }
// }

// router.get('/kelp', async (req, res) => {
//   console.log("🌊 GET /api/kelp/kelp hit");
//   fetchAndSendDataGrouped('clean_kelp_each_year', req, res);
// });

// router.get('/sea-urchin', async (req, res) => {
//   console.log("🦔 GET /api/kelp/sea-urchin hit");
//   fetchAndSendDataGrouped('clean_sea_urchin_each_year', req, res);
// });

// export default router;



import express from 'express';
import { pool } from '../db.js'; 

const router = express.Router();


async function fetchAllFromTable(tableName, req, res) {
  try {
    console.log(`🔥 Fetching all data from ${tableName}`);

    const result = await pool.query(`SELECT * FROM ${tableName}`);
    res.json(result.rows);

  } catch (error) {
    console.error(`Error fetching from ${tableName}:`, error);
    res.status(500).json({ error: error.message || "Unknown error" });
  }
}


router.get('/kelp', async (req, res) => {
  console.log("🌊 GET /api/kelp/kelp hit");
  fetchAllFromTable('clean_kelp_each_year', req, res);
});


router.get('/sea-urchin', async (req, res) => {
  console.log("🦔 GET /api/kelp/sea-urchin hit");
  fetchAllFromTable('clean_sea_urchin_each_year', req, res);
});

export default router;
