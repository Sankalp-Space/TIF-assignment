import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { snowflakeId } from '../utils/snowflake.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            _id: snowflakeId(),
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ status: true, content: { user }, meta: { access_token: token } });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(400).json({ status: false, error: 'Signup failed', details: err.message });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ status: false, error: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: true, content: { user }, meta: { access_token: token } });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(400).json({ status: false, error: 'Signin failed', details: err.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ status: true, content: { user } });
    } catch (err) {
        console.error("Get me error:", err);
        res.status(400).json({ status: false, error: 'Unable to fetch user details', details: err.message });
    }
};
