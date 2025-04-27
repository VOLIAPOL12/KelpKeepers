import express from 'express';
import { pool } from '../db.js';


const router = express.Router();

// 获取所有 diving activities
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM diving_activities ORDER BY date ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching activities' });
  }
});

// 新建一个 activity
router.post('/', async (req, res) => {
  const { title, description, location, date, slots_available, host_user_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO diving_activities (title, description, location, date, slots_available, host_user_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, location, date, slots_available, host_user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating activity' });
  }
});

export default router;
