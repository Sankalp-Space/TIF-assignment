import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  owner: { type: String, required: true }, // user ID
}, { timestamps: true });

export default mongoose.model('Community', communitySchema);