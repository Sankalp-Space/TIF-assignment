import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('Role', roleSchema);