// backend/routes/newSpeciesRoutes.js

import express from 'express';
import { pool } from '../db.js';  

const router = express.Router();

const tables = {
    abalone: 'clean_Abalone_each_year',
    commonSeadragon: 'clean_Common_Seadragon_each_year',
    seastar: 'clean_Seastar_each_year',
    spottedHandfish: 'clean_Spotted_handfish_each_year'
};


router.get('/:species', async (req, res) => {
    const species = req.params.species;

    if (!tables[species]) {
        console.log("Invalid species name:", species);
        return res.status(400).json({ error: 'Invalid species name' });
    }

    try {
        console.log("Querying database for species:", species);
        const result = await pool.query(`SELECT * FROM "${tables[species]}" LIMIT 100;`);
        console.log("Query successful, rows returned:", result.rows.length);
        res.json(result.rows);
    } catch (error) {
        console.error("Error during query:", error.message);
        res.status(500).send('Server Error');
    }
});

export default router;