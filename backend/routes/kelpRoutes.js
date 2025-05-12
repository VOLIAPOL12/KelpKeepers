import express from 'express';
import { pool } from '../db.js'; 

const router = express.Router();


async function fetchAllFromTable(tableName, req, res) {
  try {
    console.log(`🔥 Fetching all data from ${tableName}`);

    const result = await pool.query(`SELECT * FROM ${tableName};`);
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