// backend/routes/kelpRoutes.js


const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// router.get('/', (req, res) => {
//     const results = [];

    
//     const filePath = path.resolve(__dirname, '../data/clean_kelp_each_year.csv');
//     console.log("Looking for file at: ", filePath); 

//     if (!fs.existsSync(filePath)) {
//         console.error("File not found at: ", filePath);
//         return res.status(404).send("File not found.");
//     }

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//         if (results.length < 100) {  
//             results.push(data);
//         }
//     })
//       // .on('data', (data) => results.push(data))
//       .on('end', () => res.json(results))
//       .on('error', (err) => res.status(500).json({ error: err.message }));
// });

router.get('/kelp', (req, res) => {
  const results = [];
  const filePath = path.resolve(__dirname, '../data/clean_kelp_each_year.csv');
  console.log("Kelp data file path: ", filePath);

  if (!fs.existsSync(filePath)) {
      return res.status(404).send("Kelp data file not found.");
  }

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
        if (results.length < 100) { 
            results.push(data);
        }
    })
    .on('end', () => res.json(results))
    .on('error', (err) => res.status(500).json({ error: err.message }));
});

router.get('/sea-urchin', (req, res) => {
  const results = [];
  const filePath = path.resolve(__dirname, '../data/clean_sea_urchin_each_year.csv');
  console.log("Sea Urchin data file path: ", filePath);

  if (!fs.existsSync(filePath)) {
      return res.status(404).send("Sea Urchin data file not found.");
  }

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
        if (results.length < 100) { 
            results.push(data);
        }
    })
    .on('end', () => res.json(results))
    .on('error', (err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
