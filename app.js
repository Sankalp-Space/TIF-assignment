import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/v1/auth', authRoutes);
app.use('/v1/community', communityRoutes);
app.use('/v1/member', memberRoutes);
app.use('/v1/role', roleRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;