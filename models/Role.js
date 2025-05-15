import mongoose from 'mongoose';
import { snowflakeId } from '../utils/snowflake.js';

const roleSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => snowflakeId(),
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 64,
        trim: true,
    }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
export default Role;