import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateSnowflakeId } from '../utils/snowflake.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      id: generateSnowflakeId(),
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ status: true, content: user });
  } catch (err) {
    res.status(400).json({ status: false, error: 'Signup failed' });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ status: false, error: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ status: false, error: 'Invalid password' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ status: true, content: user, meta: { access_token: token } });
};

export const getMe = async (req, res) => {
  const user = await User.findOne({ id: req.user.id });
  res.json({ status: true, content: user });
};