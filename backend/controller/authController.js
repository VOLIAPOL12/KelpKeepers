import { createResetToken, validateEmail, validatePassword } from '../utils/authUtils.js';
import {findOne, addUser, updateVerifyOtp, findById, verifyUserAccount, updateUserPassword, updateResetOtp, updateUserById} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';

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
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome to KelpKeepers',
                text: `Welcome to KelpKeepers website. Your account has been created with email: ${email}`
            }

            await transporter.sendMail(mailOptions);

            return res.json({success: true});

        } catch (error) {
            res.status(400).json({success: false, message: error.message});
        }
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

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
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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

export const sendVerifyOtp = async (req, res) => {
    try {

        const {userId} = req.body;

        const user = await findById(userId);


        if(user.is_account_verified){
            return res.status(401).json({ success: false, message: "Account is Already Verified" });
        }

        const otp = String(Math.floor(Math.random() * 900000));
        const expireAt = Date.now() + 10 * 60 * 1000;

        await updateVerifyOtp(user.user_id, otp, expireAt);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Verification OTP sent on Email'});


    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp) {
        return res.status(400).json({ success: false, message: 'Missing Details'});
    }
    try {
        const user = await findById(userId);
        
        if(!user) {
            return res.status(400).json({ success: false, message: 'User Not found'});
        }

        if(user.verify_otp === '' || user.verify_otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP'});
        }
        if(user.verify_otp_expire_at < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired'});
        }
        await verifyUserAccount(userId);
        return res.status(200).json({ success: true, message: 'Email verified'});

    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

export const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({ success: false, message: 'Email required'});
    }

    try {
        const user = await findOne(email);

        if(!user) {
            return res.status(400).json({ success: false, message: 'User Not Found'});
        }

        const otp = String(Math.floor(Math.random() * 900000));
        const expireAt = Date.now() + 10 * 60 * 1000;


        await updateResetOtp(user[0].user_id, otp, expireAt);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user[0].email,
            subject: 'Password Reset OTP',
            text: `Your OTP is ${otp}. Use this to proceed with password reset.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Verification OTP sent on Email'});

    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if(!email || !otp || !newPassword) {
        return res.status(401).json({ success: false, message: "Email, OTP, and new password are required" });
    }

    try {
        
        const user = await findOne(email);
        console.log(user)
        if(!user[0]) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        if(user[0].reset_otp === "" || user[0].reset_otp !== otp) {
            return res.status(401).json({ success: false, message: "Invalid OTP" });
        }

        if(user[0].reset_otp_expire_at < Date.now()) {
            return res.status(401).json({ success: false, message: "OTP expired" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await updateUserPassword(user[0].user_id, hashedPassword)
        return res.status(200).json({ success: true, message: 'Password change Successful'});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, password, padi_certification } = req.body;
    
        const user = await findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
        const updateFields = {};
    
        if (name && name.trim() !== '') {
            updateFields.name = name.trim();
        }
    
        if (padi_certification && padi_certification.trim() !== '') {
            updateFields.padi_certification = padi_certification.trim();
        }
    
        if (password && password.trim() !== '') {
            const hashed = await bcrypt.hash(password.trim(), 10);
            updateFields.password_hash = hashed;
        }
    
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, message: 'No valid fields provided for update.' });
        }
    
        await updateUserById(userId, updateFields);
    
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
  };
  