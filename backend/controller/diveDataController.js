import { query } from '../db.js';

export const uploadDiveData = async (req, res) => {
    try {
        const {
        event_id,
        found_kelp,
        plant_kelp,
        remove_urchin,
        duration,
        date,
        start_time,
        temperature_celsius,
        latitude,
        longitude,
        notes,
        created_at,
        } = req.body;

        const user_id = req.user?.id || req.body.userId;
        if (!user_id) {
        return res.status(401).json({ success: false, message: 'User not authenticated.' });
        }

        // 1. Insert into DiveResult
        const diveResultRes = await query(
            `INSERT INTO "DiveResult" ("found kelp", "plant kelp", "remove urchin", user_id, event_id, duration)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING result_id`,
            [found_kelp, plant_kelp, remove_urchin, user_id, event_id, duration]
        );

        const dive_result_id = diveResultRes.rows[0].result_id;

        // 2. Insert into DiveLog
        await query(
        `INSERT INTO "DiveLog" (
            dive_result_id, date, start_time, duration_minutes,
            max_depth_meters, avg_depth_meters, temperature_celsius,
            gas_mix, dive_site_name, latitude, longitude, notes, created_at
        ) VALUES (
            $1, $2, $3, $4,
            NULL, NULL, $5,
            NULL, NULL, $6, $7, $8, $9
        )`,
        [
            dive_result_id,
            date,
            start_time,
            duration,
            temperature_celsius,
            latitude,
            longitude,
            notes,
            created_at || new Date().toISOString()
        ]
        );

        res.status(201).json({ success: true, message: 'Dive data uploaded successfully' });
    } catch (error) {
        console.error('Upload dive data error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
