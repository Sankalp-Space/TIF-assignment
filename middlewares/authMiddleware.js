import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ status: false, error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ status: false, error: 'Invalid token. User not found.' });
        }
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ status: false, error: 'Invalid token' });
    }
};
