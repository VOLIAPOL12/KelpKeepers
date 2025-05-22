import { pool } from '../db.js';

export const insertRating = async (user_id, event_id, rating, comment) => {
    const result = await pool.query(
        'INSERT INTO rating (user_id, event_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, event_id, rating, comment]
    );
    return result.rows[0];
};

export const fetchRatingsByEvent = async (event_id) => {
    const result = await pool.query(
        'SELECT * FROM rating WHERE event_id = $1',
        [event_id]
    );
    return result.rows;
};

export const fetchAverageRating = async (event_id) => {
    const result = await pool.query(
        'SELECT AVG(rating) AS average_rating FROM rating WHERE event_id = $1',
        [event_id]
    );
    return result.rows[0];
};
