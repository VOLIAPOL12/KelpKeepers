import { createResetToken, validateEmail, validatePassword } from '../utils/authUtils.js';
import {findOne, addUser} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
    
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
            const existingUser = await findOne(email);

            if(existingUser.length !== 0) {
                return res.json({ success: false, message: "user already exists"});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userObj = {
                name,
                email,
                hashedPassword,
                role
            };

            const users = await addUser(userObj);

            const user = users[0];

            const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            return res.json({success: true});

        } catch (error) {
            res.json({success: false, message: error.message});
        }
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({success: false, message: "Email and Password are required" });
    }

    try {
        const users = await findOne(email);

        if (!users || users.length === 0) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if(!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.json({success: true});
    } catch (error) {
        return res.status(400).json ({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({ success: true, message: 'Logged Out' });
    } catch(error) {
        return res.json ({ success: false, message: error.message });
    }
}