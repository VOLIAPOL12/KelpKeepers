import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// 获取所有活动列表（简略信息）
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT event_id, title, description, location, date, slots_available, host_user_id
      FROM diving_activities
      ORDER BY date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching diving activities:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 根据event_id获取单个活动详细信息
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT event_id, title, description, location, date, slots_available, host_user_id
      FROM diving_activities
      WHERE event_id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching activity by id:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
