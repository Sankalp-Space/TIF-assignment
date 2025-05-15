import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { snowflakeId } from '../utils/snowflake.js';

const userSchema = new mongoose.Schema({
    _id: {
    type: String,
    default: () => snowflakeId(),
    },
    name: {
    type: String,
    required: true,
    maxLength: 64,
    trim: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 128,
    lowercase: true,
    trim: true,
    },
    password: {
    type: String,
    required: true,
    minLength: 6,
    },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);
export default User;