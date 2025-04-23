import { query } from '../db.js';  

const findOne = async (email) => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows;
}

const addUser = async(user) => {
    const result = await query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
        [user.name, user.email, user.hashedPassword]
    );
    return result.rows;
}

module.exports = {
    findOne,
    addUser,
}