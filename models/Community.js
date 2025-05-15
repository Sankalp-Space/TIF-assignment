import mongoose from 'mongoose';
import { snowflakeId } from '../utils/snowflake.js';

const communitySchema = new mongoose.Schema({
    _id: {
    type: String,
    default: () => snowflakeId(),
    },
    name: {
    type: String,
    required: true,
    unique: false, 
    maxLength: 128,
    },
    slug: {
    type: String,
    required: true,
    unique: true,
    maxLength: 255,
    lowercase: true,
    trim: true,
    },
    owner: {
    type: String,
    ref: 'User',
    required: true,
    }
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);
export default Community;
