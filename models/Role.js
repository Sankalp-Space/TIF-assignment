import mongoose from 'mongoose';
import { snowflakeId } from '../utils/snowflake.js';
import Member from './Member.js';

const roleSchema = new mongoose.Schema({
    _id: {
    type: String,
    default: () => snowflakeId(),
    },
    name: {
    type: String,
    required: true,
    unique: true,
    }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
export default Member;