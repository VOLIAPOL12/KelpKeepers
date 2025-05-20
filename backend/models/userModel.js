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

export const updateVerifyOtp = async (userId, otp, expireAt) => {
    const text = `
        UPDATE "User"
        SET verify_otp = $1,
            verify_otp_expire_at = $2
        WHERE user_id = $3
        RETURNING user_id, email, verify_otp, verify_otp_expire_at
    `;
    const values = [otp, expireAt, userId];
    const result = await query(text, values);
    return result.rows[0];
};

export const findById = async (userId) => {
    const text = `
        SELECT user_id, name, email, role, created_at, is_email_verified, is_account_verified, user_status, verify_otp, joined_event_id
        FROM "User"
        WHERE user_id = $1
    `;
    const values = [userId];
    const result = await query(text, values);
    return result.rows[0]; // returns undefined if not found
};

export const verifyUserAccount = async (userId) => {
    const text = `
        UPDATE "User"
        SET is_email_verified = TRUE,
            verify_otp = '',
            verify_otp_expire_at = 0
        WHERE user_id = $1
        RETURNING user_id, name, email, is_account_verified;
    `;
    const values = [userId];
    const result = await query(text, values);
    return result.rows[0];
};

export const updateResetOtp = async (userId, otp, expireAt) => {
    const text = `
        UPDATE "User"
        SET reset_otp = $1,
            reset_otp_expire_at = $2
        WHERE user_id = $3
        RETURNING user_id, email, reset_otp, reset_otp_expire_at
    `;
    const values = [otp, expireAt, userId];
    const result = await query(text, values);
    return result.rows[0];
}

export const updateUserPassword = async (userId, newHashedPassword) => {
    console.log(userId, newHashedPassword);
    const text = `
      UPDATE "User"
      SET password_hash = $1,
          password_last_changed_at = CURRENT_TIMESTAMP,
          reset_otp = '',
          reset_otp_expire_at = 0
      WHERE user_id = $2
      RETURNING user_id, email, password_last_changed_at;
    `;
    const values = [newHashedPassword, userId];
    const result = await query(text, values);
    return result.rows[0];
  };

export const updateUserStatus = async (userId, status) => {
    try {
        const text = `
            UPDATE "User"
            SET status = $1
            WHERE user_id = $2
            RETURNING user_id, name, email, status;
        `;
        const values = [status, userId];
        const result = await query(text, values);
        return result.rows[0]; // 返回更新后的用户信息
    } catch (err) {
        console.error("Error updating user status:", err.message);
        throw err;
    }
};
