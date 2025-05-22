import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// 获取所有 dive events
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM diveevent ORDER BY date ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching dive events' });
  }
});

// 获取单个 diving activity（通过 event_id）
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM diveevent WHERE event_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching activity' });
  }
});


// 新建一个 dive event
router.post('/', async (req, res) => {
  const { title, description, divesite_id, date, slots_available, host_user_id } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Insert the dive event
    const eventResult = await client.query(
      `INSERT INTO "diveevent" (title, description, divesite_id, date, max_slots, host_user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, divesite_id, date, slots_available, host_user_id]
    );

    const newEvent = eventResult.rows[0];
    const eventId = newEvent.event_id;

    // 2. Add the host as a participant
    await client.query(
      `INSERT INTO eventparticipant (user_id, event_id, joined_at)
       VALUES ($1, $2, NOW())`,
      [host_user_id, eventId]
    );

    await client.query('COMMIT');
    res.status(201).json(newEvent);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Server error while creating dive event' });
  } finally {
    client.release();
  }
});


export default router;
