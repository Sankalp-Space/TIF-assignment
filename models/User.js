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
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
    type: String,
    required: true,
    }
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
