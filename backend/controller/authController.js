import { createResetToken, validateEmail, validatePassword } from '../utils/authUtils.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
    
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        if (!validatePassword(password)) {
            return res.status(400).json({ 
                message: 'Password must be at least 8 characters and include uppercase, lowercase, number and special character' 
            });
        }

        try {
            const salt = bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const result = await User.addUser(name, email, hashedPassword)

            const token = jwt.sign(({}))
        } catch (error) {

        }
    } catch (error) {
        next(error);
    }
}