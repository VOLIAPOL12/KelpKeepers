import { query } from '../db.js';  

export const findOne = async (email) => {
    const result = await query('SELECT * FROM "User" WHERE "email" = $1', [email]);
    return result.rows;
}

export const addUser = async(user) => {
    try {
        const result = await query(
            `INSERT INTO "User" (name, email, password_hash, role) 
            VALUES ($1, $2, $3, $4) 
            RETURNING user_id, name, email, role`,
            [user.name, user.email, user.hashedPassword, user.role]
        );
        return result.rows;
    } catch (err) {
        console.error("Error inserting user:", err.message);
        throw err;
    }
}