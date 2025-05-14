import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  community: { type: String, required: true },
  user: { type: String, required: true },
  role: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);