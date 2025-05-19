import { addEventParticipant } from "../models/eventParticipantModel.js";

export const joinDiveEvent = async (req, res) => {
    const { userId, event_id } = req.body;

    if (!userId || !event_id) {
        return res.status(400).json({ success: false, message: 'Missing user_id or event_id' });
    }
    
    try {
        const participant = await addEventParticipant({ userId, event_id });
        res.json({
            success: true,
            message: 'User successfully joined the dive event',
            participant
        });
    } catch (error) {
        console.error('Join event error:', error.message);
        res.status(500).json({ success: false, message: 'Server error while joining event' });
    }
};
