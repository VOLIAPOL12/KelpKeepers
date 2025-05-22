import {
    insertRating,
    fetchRatingsByEvent,
    fetchAverageRating
} from '../models/ratingModel.js';
  
export const submitRating = async (req, res) => {
    try {
        const { userId, event_id, rating, comment } = req.body;
        const result = await insertRating(userId, event_id, rating, comment);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error submitting rating:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
  
export const getRatingsByEvent = async (req, res) => {
    try {
        const { event_id } = req.params;
        const result = await fetchRatingsByEvent(event_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching ratings:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
  
export const getAverageRating = async (req, res) => {
    try {
        const { event_id } = req.params;
        const result = await fetchAverageRating(event_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching average rating:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
  