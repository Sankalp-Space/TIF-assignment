import express from 'express';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(express.json());

// Mount Routes
app.use('/v1/auth', authRoutes);

// Export app for server.js to use
export default app;
