// backend/routes/diveSitesRoutes.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/Dive sites in Tasmania.csv'); 

    console.log("Looking for file at:", filePath); 

    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return res.status(404).send("File not found.");
    }

    const results = [];
    fs.createReadStream(filePath)
    .pipe(csv({ mapHeaders: ({ header }) => header.trim().replace(/^(\uFEFF)/, '') }))
        // .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log("Successfully read file with", results.length, "records");
            res.json(results);
        })
        .on('error', (err) => {
            console.error("Error reading file:", err);
            res.status(500).send("Error reading file.");
        });
});

module.exports = router;
