import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// 提交评分
router.post('/', async (req, res) => {
  const { user_id, event_id, rating, comment } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO rating (user_id, event_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, event_id, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// 获取指定活动的所有评分和评论
router.get('/:event_id', async (req, res) => {
  const { event_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM rating WHERE event_id = $1',
      [event_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ✅ 获取指定活动的平均评分
router.get('/average/:event_id', async (req, res) => {
  const { event_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT AVG(rating) AS average_rating FROM rating WHERE event_id = $1',
      [event_id]
    );

    res.status(200).json(result.rows[0]); 
  } catch (err) {
    console.error('Error fetching average rating:', err.message);
    res.status(500).send('Server error');
  }
});

export default router;
